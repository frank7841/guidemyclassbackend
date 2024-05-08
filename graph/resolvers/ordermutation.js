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
const UserAcc = require("../../models/useraccounts");

const {
  transformWork,
  transformOrder,
  transformPriceRates,
  transformBoostWork,
} = require("./merge");

module.exports = {
  createWork: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }

    try {
      const addedWork = new Work({
        workType: args.workType,
        amount: args.amount,
      });

      const result = await addedWork.save();

      return transformWork(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateWork: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }

    try {
      // const supplier = await Supplier.findOne({
      //   _id: args.supplierID,
      // });
      // if (!supplier) {
      //   throw new Error("supplier not found");
      // }
      const input = args.input;
      const result = await Work.findOneAndUpdate({ _id: input._id }, input, {
        new: true,
      });

      if (!result) {
        throw new Error("Order has not been updated");
      }
      return transformOrder(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createBoostRates: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }

    try {
      const addedBoost = new BoostWork({
        title: args.title,
        description: args.description,
        price: args.price,
      });

      const result = await addedBoost.save();

      return transformBoostWork(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateBoostRates: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }

    try {
      // const supplier = await Supplier.findOne({
      //   _id: args.supplierID,
      // });
      // if (!supplier) {
      //   throw new Error("supplier not found");
      // }
      const input = args.input;
      const result = await BoostWork.findOneAndUpdate(
        { _id: input._id },
        input,
        {
          new: true,
        }
      );

      if (!result) {
        throw new Error("Boost Work has not been updated");
      }
      return transformBoostWork(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createPriceRates: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }

    try {
      const addedPriceRates = new PriceRates({
        hourlyRate: args.hourlyRate,
        pricePerSinglePage: args.pricePerSinglePage,
        pricePerDoublePage: args.pricePerDoublePage,
      });

      const result = await addedPriceRates.save();

      return transformPriceRates(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updatePriceRates: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }

    try {
      // const supplier = await Supplier.findOne({
      //   _id: args.supplierID,
      // });
      // if (!supplier) {
      //   throw new Error("supplier not found");
      // }
      const input = args.input;
      const result = await PriceRates.findOneAndUpdate(
        { _id: input._id },
        input,
        {
          new: true,
        }
      );

      if (!result) {
        throw new Error("Price Rate has not been updated");
      }
      return transformPriceRates(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createOrder: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }

    try {
      const user = await UserAcc.findOne({
        _id: args.createorder.user,
      });

      const subject = await Subject.findOne({
        _id: args.createorder.subject,
      });
      const work = await Work.findOne({
        _id: args.createorder.work,
      });
      const academicLevel = await AcademicLevel.findOne({
        _id: args.createorder.academicLevel,
      });
      const expertLevel = await ExpertLevel.findOne({
        _id: args.createorder.expertLevel,
      });
      const reference = await ReferencingStyleType.findOne({
        _id: args.createorder.referencingStyle,
      });

      if (!user) {
        throw new Error("user not found");
      }
      if (!subject) {
        throw new Error("subject not found");
      }
      if (!work) {
        throw new Error("work not found");
      }
      if (!academicLevel) {
        throw new Error("academicLevel not found");
      }
      if (!reference) {
        throw new Error("reference not found");
      }
      if (!expertLevel) {
        throw new Error("expertLevel not found");
      }

      const addedOrder = new Order({
        work: work._id,
        academicLevel: academicLevel._id,
        expertLevel: expertLevel._id,
        email: args.createorder.email,
        user: user._id,
        noOfPages: args.createorder.noOfPages,
        deadline: args.createorder.deadline,
        urgency: args.createorder.urgency,
        phonenumber: args.createorder.phonenumber,
        price: args.createorder.price,
        payment: args.createorder.payment,
        noOfSources: args.createorder.noOfSources,
        referencingStyle: reference._id,
        instructions: args.createorder.instructions,
        topic: args.createorder.topic,
        subject: subject._id,
      });

      const result = await addedOrder.save();
      // console.log(args.createorder.boostServices);
      if (args.createorder.boostServices.length !== 0) {
        args.createorder.boostServices.forEach(async (boostService) => {
          const orderCreated = await Order.findOne({
            _id: addedOrder._id,
          });
          const boostServices = await BoostWork.findOne({
            _id: boostService,
          });

          if (!boostServices) {
            throw new Error("boostService not found");
          }

          orderCreated.boostServices.push(boostServices);
          // console.log(orderCreated);
          await orderCreated.save();
        });
      }

      return transformOrder(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateOrder: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }

    try {
      // const supplier = await Supplier.findOne({
      //   _id: args.supplierID,
      // });
      // if (!supplier) {
      //   throw new Error("supplier not found");
      // }
      const input = args.input;
      const result = await Order.findOneAndUpdate({ _id: input._id }, input, {
        new: true,
      });

      if (!result) {
        throw new Error("Order has not been updated");
      }
      return transformOrder(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteWork: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }
    try {
      const work = await Work.findOne({
        _id: args.workId,
      });
      if (!work) {
        throw new Error("Work not found");
      }

      await Work.deleteOne({ _id: args.workId });

      return transformWork(work);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteOrder: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }
    try {
      const order = await Order.findOne({
        _id: args.orderId,
      });
      if (!order) {
        throw new Error("order not found");
      }

      await Order.deleteOne({ _id: args.orderId });

      return transformOrder(order);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deletePriceRates: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }
    try {
      const order = await PriceRates.findOne({
        _id: args.priceRateId,
      });
      if (!order) {
        throw new Error("Price Rates not found");
      }

      await PriceRates.deleteOne({ _id: args.priceRateId });

      return transformPriceRates(order);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteBoostRates: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }
    try {
      const boost = await BoostWork.findOne({
        _id: args.boostId,
      });
      if (!boost) {
        throw new Error("Boosted Rates not found");
      }

      await BoostWork.deleteOne({ _id: args.boostId });

      return transformBoostWork(boost);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
