const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_KEY_PRODUCTION);
// const stripe = Stripe(process.env.STRIPE_KEY_DEV);
exports.initiate = async (req, res, next) => {
  //   console.log(req.body);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });
    res.send({
      message: "Payment Intent created",
      paymentDetails: paymentIntent,
    });
    // };
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went Wrong",
    });
  }
};
