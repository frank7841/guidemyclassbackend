const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ratesSchema = new Schema(
  {
    hourlyRate: { type: String },
    pricePerSinglePage: { type: String },
    pricePerDoublePage: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PriceRates", ratesSchema);
