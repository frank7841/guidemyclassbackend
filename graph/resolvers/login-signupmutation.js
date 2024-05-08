const bycrypt = require("bcryptjs");
const UserAcc = require("../../models/useraccounts");
const { transformuser } = require("./merge");
const jwt = require("jsonwebtoken");
const uri = `https://guidemyclass.com`;
const mailgun = require("mailgun-js");
const domain = "mg.guidemyclass.com";
const api_key = "d30e21ff4edfd1fa316b96a71cefead9-d51642fa-05847e3f";
const mg = mailgun({
  apiKey: api_key,
  domain: domain,
  // host: "https://api.mailgun.net",
});

module.exports = {
  createUser: async (parent, args, context) => {
    try {
      //convert the input into lowercase then check if the user exist before creating an account
      const emaillc = args.createAcc.email.toLowerCase();
      //check if email already exists
      const existingUser = await UserAcc.findOne({ email: emaillc });

      //check if the number already esits
      const existingPhoneNumber = await UserAcc.findOne({
        phonenumber: args.createAcc.phone_number,
      });
      // const country = await Country.findOne({
      //   _id: args.createAcc.country,
      // });

      // check if passwords match

      const password = args.createAcc.password;

      const confirmPassword = args.createAcc.confirmpassword;

      if (password !== confirmPassword) {
        throw new Error("Password doesnt match");
      }

      if (existingUser) {
        throw new Error("email is Taken");
      }

      // if (!country) {
      //   throw new Error("specified Country does not exist");
      // }

      // if (args.createAcc.county.length !== 0) {
      //   const county = await County.findOne({
      //     _id: args.createAcc.county,
      //   });

      //   if (!county) {
      //     throw new Error("specified County does not exist");
      //   }
      // }
      if (existingPhoneNumber) {
        throw new Error("Phonenumber is already taken");
      }
      // hash password
      //return tell the graphql that its a synchronous and it should wait
      const hashedPassword = await bycrypt.hash(args.createAcc.password, 12);
      //create a new user
      const user = new UserAcc({
        email: emaillc,
        phone_number: args.createAcc.phone_number,
        username: args.createAcc.username,
        password: hashedPassword,
        role: "client",
        // county: args.createAcc.county,
      });

      try {
        //save it to the database
        const result = await user.save();
        const newusers = { ...result._doc, password: null };

        return newusers;
      } catch (err) {
        console.log(err);
        throw err;
      }
    } catch (err) {
      throw err;
    }
  },
  updateuser: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }

    try {
      const input = args.input;
      const result = await UserAcc.findOneAndUpdate(
        { _id: context.req.userId },
        input,
        {
          new: true,
        }
      );

      if (!result) {
        throw new Error("User has not been updated");
      }
      return { ...result._doc, password: null };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  login: async (parent, args, { res, req }) => {
    // }

    try {
      const usernamelc = args.email.toLowerCase();

      const user = await UserAcc.findOne({ email: usernamelc });

      if (!user) {
        throw new Error("User does not exist");
      }

      const isEqual = await bycrypt.compare(args.password, user.password);
      if (!isEqual) {
        throw new Error("password is incorrect!");
      }

      // create token
      const refreshtoken = jwt.sign(
        {
          userId: user._id,
          email: user.email,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "365d",
        }
      );
      res.cookie("refreshtoken", refreshtoken, {
        sameSite: "none",
        path: "/",
        expires: new Date(new Date().getTime() + 3600 * 1000 * 24 * 365),
        httpOnly: true,
        secure: true,
        // domain: 'trapflix.com', //set your domain
      });
      //return the generated details
      return {
        userId: user.id,
        token: refreshtoken,
        username: user.username,
        role: user.role,
        tokenExpiration: 1,
      };
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  },
  resetpassword: async (parent, args, context) => {
    const { token, id, confirmPassword, password } = args;

    if (confirmPassword !== password) {
      throw new Error(" Password does not match ");
    }

    const user = await UserAcc.findOne({ _id: id });
    if (!user) {
      throw new Error("User Does Not Exist!");
    }

    const secret = process.env.JWT_KEY + user.password;

    const payload = jwt.verify(token, secret);

    if (!payload) {
      throw new Error("The Link is no longer valid!");
    }

    const hashedPassword = await bycrypt.hash(password, 12);

    const currentuser = await UserAcc.findOneAndUpdate(
      { _id: id },
      {
        password: hashedPassword,
      },
      {
        new: true,
      }
    );
    if (!currentuser) {
      throw new Error("User does not exist");
    }
    const msg = {
      from: "support@gugidemyclass.com", // sender address
      to: `${user.email}`, // list of receivers
      subject: `Password Has Been Changed Via GuideMyClass`, // Subject line
      text: `GuideMyClass`, // plain text body
      html: `
  
        <b> Hi ${user.username}, </b>

        <p>This email is to inform you that your password has been changed.</p>
    
        <p>
          If this wasn't you send us an email at
          <a
            href="mailto:support@essaysinn.com"
            style="text-decoration: none; color: #3aaade"
          >
            <span>support@essaysinn.com</span>
          </a>
          immediately. 
        </p>
    
        <p>Thanks, Essaysinn team.</p>
        <br />
       
   
        `, // html body
    };

    mg.messages()
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error.message);
      });
    return currentuser;
  },

  requestResetPassword: async (parent, args, context) => {
    const email = args.email.toLowerCase();

    const existingEmail = await UserAcc.findOne({ email: email });

    if (!existingEmail) {
      throw new Error("Email does not exist!");
    }

    const payload = {
      email: existingEmail.email,
      id: existingEmail._id,
    };

    const secret = process.env.JWT_KEY + existingEmail.password;
    const token = jwt.sign(payload, secret, { expiresIn: "15m" });

    const link = `${uri}/reset-password/${token}/${existingEmail._id}`;

    const msg = {
      from: "support@guidemyclass.com", // sender address
      to: `${existingEmail.email}`, // list of receivers
      subject: `Password Change Request Via GuideMyClass`, // Subject line
      text: `${link}`, // plain text body
      html: `

          <b> Hi ${existingEmail.username} </b> ,
          <p>
            You recently requested to reset the password for GuideMyClass
            account. Click the button below to proceed.
          </p>
          <div style="justify-content: center; width: 100%; display: flex">
            <a
              href="${link}"
              style="
                background-color: #3aaade;
                border-radius: 0.5rem;
                padding: 0.7rem;
                justify-content: center;
                text-decoration-line: none;
                color: white;
              "
            >
              Reset Password</a
            >
          </div>

          <p>
            If you did not request a password reset, please ignore this email or reply
            to let us know. <br />
            This password reset link is only valid for the next 15 minutes.
          </p>
          <p>Thanks, Essaysinn team.</p>
          <br>
          <br>
          `, // html body
    };
    mg.messages()
      .send(msg)
      .then((info) => {
        console.log(info);
      })
      .catch((error) => {
        console.error(error.message);
      });

    return existingEmail;
  },
  updatepassword: async (parent, { input }, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }
    if (input.password !== input.confirmpassword) {
      throw new Error(`Password does not match`);
    }
    try {
      const user = await UserAcc.findOne({ _id: context.req.userId });
      if (!user) {
        throw new Error("User does not exist");
      }
      const hashedPassword = await bycrypt.hash(input.password, 12);

      const pass = { password: hashedPassword };
      const currentuser = await UserAcc.findOneAndUpdate(
        { _id: context.req.userId },
        pass,
        {
          new: true,
        }
      );

      //     const msg = {
      //       from: "support@themarketpalace.com", // sender address
      //       to: `${user.email}`, // list of receivers
      //       subject: `Password Has Been Changed`, // Subject line
      //       text: `The Market Palace`, // plain text body
      //       html: `

      //       Hi ${user.username},

      //      this email is to inform you that your password has been changed.

      //      if this wasn't you send us an email at  <a href="mailto:contact@themarketpalace.com" color="#000000" class="sc-gipzik iyhjGb" style="text-decoration: none; color: rgb(0, 0, 0); font-size: 12px;">
      //      <span>support@themarketpalace.com</span>
      //      </a> immediately.

      //       You can also find more of our guides here to learn more about https://www.themarketpalace.com/FAQ.

      //       Take care!
      //       <a href="mailto:contact@themarketpalace.com" color="#000000" class="sc-gipzik iyhjGb" style="text-decoration: none; color: rgb(0, 0, 0); font-size: 12px;">
      //   <span>support@themarketpalace.com</span>
      //   </a>
      // <br>
      //   <b>Do not reply to this email.</b>

      //   <br>
      //   <br>

      //       <table cellpadding="0" cellspacing="0" class="sc-gPEVay eQYmiW" style="vertical-align: -webkit-baseline-middle; font-size: medium; font-family: Arial;">
      //   <tbody>
      //   <tr>
      //   <td>
      //   <table cellpadding="0" cellspacing="0" class="sc-gPEVay eQYmiW" style="vertical-align: -webkit-baseline-middle; font-size: medium; font-family: Arial;">
      //   <tbody>
      //   <tr>
      //   <td style="padding: 0px; vertical-align: middle;">
      //   <h3 color="#000000" class="sc-fBuWsC eeihxG" style="margin: 0px; font-size: 18px; color: rgb(0, 0, 0);">
      //   <span>themarketpalace</span>
      //   <span>&nbsp;</span>
      //   <span></span>
      //   </h3>
      //   <p color="#000000" font-size="medium" class="sc-fMiknA bxZCMx" style="margin: 0px; color: rgb(0, 0, 0); font-size: 14px; line-height: 22px;">
      //   <span>Digital rights market</span>
      //   </p>
      //   <p color="#000000" font-size="medium" class="sc-dVhcbM fghLuF" style="margin: 0px; font-weight: 500; color: rgb(0, 0, 0); font-size: 14px; line-height: 22px;">
      //   <span>TheMarketPalace</span>
      //   </p>
      //   <p color="#000000" font-size="medium" class="sc-eqIVtm kRufpp" style="color: rgb(0, 0, 0); margin: 0px; font-size: 14px; line-height: 22px;">
      //   <span>buy and sell your social account</span>
      //   </p>
      //   <table cellpadding="0" cellspacing="0" class="sc-gPEVay eQYmiW" style="vertical-align: -webkit-baseline-middle; font-size: medium; font-family: Arial; width: 100%;">
      //   <tbody>
      //   <tr>
      //   <td height="30"></td>
      //   </tr>
      //   <tr>
      //   <td color="#28b6a8" direction="horizontal" height="1" class="sc-jhAzac hmXDXQ" style="width: 100%; border-bottom: 1px solid rgb(40, 182, 168); border-left: none; display: block;">
      //   </td>
      //   </tr>
      //   <tr>
      //   <td height="30"></td>
      //   </tr>
      //   </tbody>
      //   </table>
      //   <table cellpadding="0" cellspacing="0" class="sc-gPEVay eQYmiW" style="vertical-align: -webkit-baseline-middle; font-size: medium; font-family: Arial;">
      //   <tbody>
      //   <tr height="25" style="vertical-align: middle;"><td width="30" style="vertical-align: middle;">
      //   <table cellpadding="0" cellspacing="0" class="sc-gPEVay eQYmiW" style="vertical-align: -webkit-baseline-middle; font-size: medium; font-family: Arial;">
      //   <tbody>
      //   <tr>
      //   <td style="vertical-align: bottom;">
      //   <span color="#28b6a8" width="11" class="sc-jlyJG bbyJzT" style="display: block; background-color: rgb(40, 182, 168);">
      //   <img src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/email-icon-2x.png" color="#28b6a8" width="13" class="sc-iRbamj blSEcj" style="display: block; background-color: rgb(40, 182, 168);">
      //   </span>
      //   </td>
      //   </tr>
      //   </tbody>
      //   </table>
      //   </td>
      //   <td style="padding: 0px;">
      //   <a href="mailto:contact@themarketpalace.com" color="#000000" class="sc-gipzik iyhjGb" style="text-decoration: none; color: rgb(0, 0, 0); font-size: 12px;">
      //   <span>support@themarketpalace.com</span>
      //   </a>
      //   </td>
      //   </tr>
      //   <tr height="25" style="vertical-align: middle;"><td width="30" style="vertical-align: middle;"><table cellpadding="0" cellspacing="0" class="sc-gPEVay eQYmiW" style="vertical-align: -webkit-baseline-middle; font-size: medium; font-family: Arial;">
      //   <tbody>
      //   <tr>
      //   <td style="vertical-align: bottom;">
      //   <span color="#28b6a8" width="11" class="sc-jlyJG bbyJzT" style="display: block; background-color: rgb(40, 182, 168);">
      //   <img src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/link-icon-2x.png" color="#28b6a8" width="13" class="sc-iRbamj blSEcj" style="display: block; background-color: rgb(40, 182, 168);">
      //   </span>
      //   </td>
      //   </tr>
      //   </tbody>
      //   </table>
      //   </td>
      //   <td style="padding: 0px;">
      //   <a href="//themarketpalace.com" color="#000000" class="sc-gipzik iyhjGb" style="text-decoration: none; color: rgb(0, 0, 0); font-size: 12px;">
      //   <span>themarketpalace.com</span>
      //   </a></td></tr>
      //   </tbody>
      //   </table>
      //   <table cellpadding="0" cellspacing="0" class="sc-gPEVay eQYmiW" style="vertical-align: -webkit-baseline-middle; font-size: medium; font-family: Arial;">
      //   <tbody>
      //   <tr>
      //   <td height="30"></td>
      //   </tr></tbody>
      //   </table>
      //   </td></tr></tbody></table></td></tr></tbody></table>
      //       `, // html body
      //     };

      //     mg.messages()
      //       .send(msg)
      //       .then(() => {
      //         console.log("Email sent");
      //       })
      //       .catch((error) => {
      //         console.error(error);
      //       });
      return currentuser;
    } catch (err) {
      throw err;
    }
  },
};
