const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const boostSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    price: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BoostRates", boostSchema);
