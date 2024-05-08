const Order = require("../../models/order");
const Work = require("../../models/work");
const Subject = require("../../models/subject");
const Source = require("../../models/source");
const ReferencingStyleType = require("../../models/referencingstyle");
const Ratings = require("../../models/ratings");
const Language = require("../../models/language");
const ExpertLevel = require("../../models/expertlevel");
const AcademicLevel = require("../../models/academiclevel");
const PriceRates = require("../../models/priceRates");
const BoostWork = require("../../models/boostWork");

const {
  transformWork,
  transformOrder,
  transformPriceRates,
  transformBoostWork,
} = require("./merge");

module.exports = {
  allWork: async (_, args, context, req) => {
    try {
      //find all users
      const jobs = await Work.find().skip(args.offset).limit(args.limit);

      return jobs.map((job) => {
        //return a well formed details about users
        return transformWork(job);
      });
    } catch (err) {
      throw err;
    }
  },

  oneWork: async (_, args, context) => {
    const job = await Work.findOne({ _id: args.donationId });
    if (!job) {
      throw new Error("job does not exist");
    }

    const isjob = transformWork(job);
    return isjob;
  },
  allPriceRates: async (_, args, context, req) => {
    try {
      //find all users
      const rates = await PriceRates.find().skip(args.offset).limit(args.limit);

      return rates.map((rate) => {
        //return a well formed details about users
        return transformPriceRates(rate);
      });
    } catch (err) {
      throw err;
    }
  },

  onePriceRates: async (_, args, context) => {
    const rate = await PriceRates.findOne({ _id: args.priceRateId });
    if (!rate) {
      throw new Error("Price Rate does not exist");
    }

    const isjob = transformPriceRates(rate);
    return isjob;
  },
  allBoostRates: async (_, args, context, req) => {
    try {
      //find all users
      const rates = await BoostWork.find().skip(args.offset).limit(args.limit);

      return rates.map((rate) => {
        //return a well formed details about users
        return transformBoostWork(rate);
      });
    } catch (err) {
      throw err;
    }
  },

  oneBoostRates: async (_, args, context) => {
    const rate = await BoostWork.findOne({ _id: args.priceRateId });
    if (!rate) {
      throw new Error("Boost Rate does not exist");
    }

    const isjob = transformBoostWork(rate);
    return isjob;
  },
  orders: async (_, args, context, req) => {
    try {
      //find all users
      const allOrders = await Order.find().skip(args.offset).limit(args.limit);

      // console.log(allOrders);
      // const indexes = await UserAcc.getIndexes();
      // console.log(indexes);
      // return events;
      return allOrders.map((order) => {
        //return a well formed details about users
        return transformOrder(order);
      });
    } catch (err) {
      throw err;
    }
  },
  myorders: async (_, args, context, req) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }
    try {
      //find all users
      const allOrders = await Order.find({ user: context.req.userId })
        .skip(args.offset)
        .limit(args.limit);

      // const indexes = await UserAcc.getIndexes();
      // console.log(indexes);
      // return events;
      return allOrders.map((order) => {
        //return a well formed details about users
        return transformOrder(order);
      });
    } catch (err) {
      throw err;
    }
  },

  oneOrders: async (_, args, context) => {
    const order = await Order.findOne({
      _id: args.orderId,
    });
    if (!order) {
      throw new Error("Order does not exist");
    }

    const isorder = transformOrder(order);
    return isorder;
  },
};
