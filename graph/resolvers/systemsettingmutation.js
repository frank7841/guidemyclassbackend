const Faq = require("../../models/faq");
const Service = require("../../models/service");
const Guarantee = require("../../models/guarantees");
const {
  transformFaq,
  transformService,
  transformGuarantee,
} = require("./merge");

module.exports = {
  createFaq: async (parent, args, context) => {
    // if (!context.req.isAuth) {
    //   throw new Error("unauthorized");
    // }

    try {
      const addedFaq = new Faq({
        question: args.question,
        answer: args.answer,
      });

      const result = await addedFaq.save();

      return transformFaq(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updatefaqs: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }

    try {
      const input = args.input;
      const result = await Faq.findOneAndUpdate({ _id: input.id }, input, {
        new: true,
      });

      if (!result) {
        throw new Error("Faq has not been updated");
      }
      return transformFaq(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  deletefaq: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }
    try {
      const faq = await Faq.findOne({ _id: args.faqId });
      if (!tax) {
        throw new Error("faq not found");
      }

      await Faq.deleteOne({ _id: args.faqId });

      return transformFaq(faq);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createService: async (parent, args, context) => {
    // if (!context.req.isAuth) {
    //   throw new Error("unauthorized");
    // }

    try {
      const addedService = new Service({
        service: args.createservice.service,
        title: args.createservice.title,
        content: args.createservice.content,
      });

      const result = await addedService.save();

      return transformService(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateServices: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }

    try {
      const input = args.updateService;
      const result = await Service.findOneAndUpdate({ _id: input._id }, input, {
        new: true,
      });

      if (!result) {
        throw new Error("Service has not been updated");
      }
      return transformService(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  deleteService: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }
    try {
      const service = await Service.findOne({ _id: args.serviceId });
      if (!service) {
        throw new Error("service not found");
      }

      await Service.deleteOne({ _id: args.serviceId });

      return transformService(service);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createGuarantee: async (parent, args, context) => {
    // if (!context.req.isAuth) {
    //   throw new Error("unauthorized");
    // }

    try {
      const addedGuarantee = new Guarantee({
        description: args.createguarantee.description,
        title: args.createguarantee.title,
        content: args.createguarantee.content,
      });

      const result = await addedGuarantee.save();

      return transformGuarantee(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateGuarantees: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }

    try {
      const input = args.guaranteeId;
      const result = await Guarantee.findOneAndUpdate(
        { _id: input._id },
        input,
        {
          new: true,
        }
      );

      if (!result) {
        throw new Error("Service has not been updated");
      }
      return transformGuarantee(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  deleteGuarantee: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }
    try {
      const guarantee = await Guarantee.findOne({ _id: args.guaranteeId });
      if (!guarantee) {
        throw new Error("guarantee not found");
      }

      await Guarantee.deleteOne({ _id: args.guaranteeId });

      return transformGuarantee(guarantee);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
