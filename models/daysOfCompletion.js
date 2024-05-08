const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const daysOfCompletionSchema = new Schema(
  {
    days: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DaysOfCompletion", daysOfCompletionSchema);
