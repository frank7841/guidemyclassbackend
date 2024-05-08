const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    work: {
      type: Schema.Types.ObjectId,
      ref: "WorkType",
    },
    academicLevel: {
      type: Schema.Types.ObjectId,
      ref: "SourceName",
    },
    expertLevel: {
      type: Schema.Types.ObjectId,
      ref: "ExpertLevel",
    },
    email: { type: String },
    user: {
      type: Schema.Types.ObjectId,
      ref: "UserAcc",
    },
    noOfPages: { type: String },
    urgency: { type: String },
    deadline: { type: String },
    phonenumber: { type: String },
    noOfSources: { type: String },
    price: { type: String },
    payment: { type: String, enum: ["0", "1"], default: "0" },
    status: { type: String, enum: ["0", "1"], default: "0" },
    referencingStyle: {
      type: Schema.Types.ObjectId,
      ref: "ReferencingStyleType",
    },
    instructions: { type: String },
    topic: { type: String },
    subject: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
    },
    attachmentUrl: [{ type: String }],

    boostServices: [
      {
        type: Schema.Types.ObjectId,
        ref: "BoostRates",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
