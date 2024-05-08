const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const languageSchema = new Schema(
  {
   
    language: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Language", languageSchema);
