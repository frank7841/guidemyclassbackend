const Faq = require("../../models/faq");
const Service = require("../../models/service");
const Guarantee = require("../../models/guarantees");

const {
  transformFaq,
  transformService,
  transformGuarantee,
} = require("./merge");

module.exports = {
  faqs: async (_, args, context, req) => {
    try {
      //find all users
      const faqs = await Faq.find().skip(args.offset).limit(args.limit);

      // const indexes = await UserAcc.getIndexes();
      // console.log(indexes);
      // return events;
      return faqs.map((faq) => {
        //return a well formed details about users
        return transformFaq(faq);
      });
    } catch (err) {
      throw err;
    }
  },

  onefaq: async (_, args, context) => {
    const faq = await Faq.findOne({
      _id: args.faqId,
    });
    if (!faq) {
      throw new Error("Faq details does not exist");
    }

    const isfaq = transformBankBilling(faq);
    return isfaq;
  },
  allServices: async (_, args, context, req) => {
    try {
      //find all users
      const services = await Service.find().skip(args.offset).limit(args.limit);

      // const indexes = await UserAcc.getIndexes();
      // console.log(indexes);
      // return events;
      return services.map((service) => {
        //return a well formed details about users
        return transformService(service);
      });
    } catch (err) {
      throw err;
    }
  },
  oneServices: async (_, args, context, req) => {
    try {
      //find all users
      const service = await Service.findOne({
        _id: args.serviceId,
      });
      if (!service) {
        throw new Error("Service  does not exist");
      }

      const isservice = transformService(service);
      return isservice;
    } catch (err) {
      throw err;
    }
  },
  allGuarantees: async (_, args, context, req) => {
    try {
      //find all users
      const guarantees = await Guarantee.find()
        .skip(args.offset)
        .limit(args.limit);

      // const indexes = await UserAcc.getIndexes();
      // console.log(indexes);
      // return events;
      return guarantees.map((guarantee) => {
        //return a well formed details about users
        return transformGuarantee(guarantee);
      });
    } catch (err) {
      throw err;
    }
  },
  oneGuarantees: async (_, args, context, req) => {
    try {
      //find all users
      const guarantee = await Guarantee.findOne({
        _id: args.guaranteeId,
      });
      if (!guarantee) {
        throw new Error("guarantee  does not exist");
      }

      const isguarantee = transformGuarantee(guarantee);
      return isguarantee;
    } catch (err) {
      throw err;
    }
  },
};
