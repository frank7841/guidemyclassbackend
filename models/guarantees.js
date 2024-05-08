const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const guaranteeSchema = new Schema(
  {
    description: { type: String },
    title: { type: String },
    content: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Guarantee", guaranteeSchema);
