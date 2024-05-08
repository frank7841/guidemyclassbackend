const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workSchema = new Schema(
  {
    workType: { type: String },
    amount: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WorkType", workSchema);
