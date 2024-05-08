const Order = require("../../models/order");
const Work = require("../../models/work");
const Subject = require("../../models/subject");
const Source = require("../../models/source");
const ReferencingStyleType = require("../../models/referencingstyle");
const Language = require("../../models/language");
const ExpertLevel = require("../../models/expertlevel");
const AcademicLevel = require("../../models/academiclevel");
const BoostWork = require("../../models/boostWork");
const UserAcc = require("../../models/useraccounts");

exports.upload = async (req, res, next) => {
  // console.log(req.body);
  console.log(req.files);

  // await

  if (req.files.length === 0) {
    return res.status(204).json({
      message: "no file provided!",
    });
  }
  try {
    const user = await UserAcc.findOne({
      _id: req.body.user,
    });
    const subject = await Subject.findOne({
      _id: req.body.subject,
    });
    const work = await Work.findOne({
      _id: req.body.work,
    });
    const academicLevel = await AcademicLevel.findOne({
      _id: req.body.academicLevel,
    });
    const expertLevel = await ExpertLevel.findOne({
      _id: req.body.expertLevel,
    });
    const reference = await ReferencingStyleType.findOne({
      _id: req.body.referencingStyle,
    });

    if (!user) {
      return res.status(404).json({
        message: "member not found",
      });
    }
    if (!subject) {
      return res.status(404).json({
        message: "subject not found",
      });
    }
    if (!work) {
      return res.status(404).json({
        message: "work not found",
      });
    }
    if (!academicLevel) {
      return res.status(404).json({
        message: "academicLevel not found",
      });
    }
    if (!expertLevel) {
      return res.status(404).json({
        message: "expertLevel not found",
      });
    }
    if (!reference) {
      return res.status(404).json({
        message: "reference not found",
      });
    }

    const addedOrder = new Order({
      work: work._id,
      academicLevel: academicLevel._id,
      expertLevel: expertLevel._id,
      email: req.body.email,
      user: user._id,
      noOfPages: req.body.noOfPages,
      deadline: req.body.deadline,
      urgency: req.body.urgency,
      phonenumber: req.body.phonenumber,
      price: req.body.price,
      payment: req.body.payment,
      noOfSources: req.body.noOfSources,
      referencingStyle: reference._id,

      instructions: req.body.instructions,
      topic: req.body.topic,
      subject: subject._id,
      // attachmentUrl: req.file.location,
    });

    await addedOrder.save();

    req.files?.forEach(async (file) => {
      const orderCreated = await Order.findOne({
        _id: addedOrder._id,
      });
      orderCreated.attachmentUrl.push(file.location);
      // console.log(orderCreated);
      await orderCreated.save();
    });
    const incomingBoostService = JSON.parse(req.body.boostServices);
    // console.log(incomingBoostService);
    if (incomingBoostService !== 0) {
      incomingBoostService?.forEach(async (boostService) => {
        const orderCreated = await Order.findOne({
          _id: addedOrder._id,
        });
        const boostServices = await BoostWork.findOne({
          _id: boostService,
        });

        if (!boostServices) {
          return res.status(404).json({
            message: "Boost Rates not found",
          });
        }

        orderCreated.boostServices.push(boostServices);
        // console.log(orderCreated);
        await orderCreated.save();
      });
    }

    res.send({
      message: "Order created succefully",
    });
    // };
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went Wrong",
    });
  }
};
