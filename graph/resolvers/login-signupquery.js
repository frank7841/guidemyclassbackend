const UserAcc = require("../../models/useraccounts");
const { transformuser } = require("./merge");

module.exports = {
  currentuser: async (parent, args, context) => {
    //check if one is logged in
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }
    try {
      const user = await UserAcc.findOne({ _id: context.req.userId });
      if (!user) {
        throw new Error("User does not exist");
      }

      const isUser = transformuser(user);
      return isUser;
    } catch (err) {
      throw err;
    }
  },

  allusers: async (_, args, context, req) => {
    try {
      //find all users
      const users = await UserAcc.find().skip(args.offset).limit(args.limit);

      // const indexes = await UserAcc.getIndexes();
      // console.log(indexes);
      // return events;
      return users.map((user) => {
        //return a well formed details about users
        return transformuser(user);
      });
    } catch (err) {
      throw err;
    }
  },

  oneuser: async (_, args, context) => {
    const user = await UserAcc.findOne({ _id: args.userId });
    if (!user) {
      throw new Error("User does not exist");
    }

    const isUser = transformuser(user);
    return isUser;
  },

  logoutuser: async (_, args, context) => {
    //check if one is logged in
    if (!context.req.isAuth) {
      throw new Error("User is not LoggedIn");
    }
    //delete token
    context.res.cookie("refreshtoken", "refreshtoken", {
      sameSite: "none",
      path: "/",
      expires: new Date(new Date().getTime() + 60),
      httpOnly: true,
      secure: true,
      //domain: 'example.com', //set your domain
    });
    return {
      userId: context.req.userId,
      token: context.req.token,
    };
  },
};
