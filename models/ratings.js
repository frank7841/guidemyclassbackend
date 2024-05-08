const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ratesSchema = new Schema(
  {
   
    rates: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rates", ratesSchema);
