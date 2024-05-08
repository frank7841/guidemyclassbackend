const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const referenceSchema = new Schema(
  {
    referencingStyleType: { type: String },
    amount: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ReferencingStyleType", referenceSchema);
