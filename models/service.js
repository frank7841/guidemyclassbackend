const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const servicesSchema = new Schema(
  {
    service: { type: String },
    title: { type: String },
    content: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Services", servicesSchema);
