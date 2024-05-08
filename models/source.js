const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sourceSchema = new Schema(
  {
   
    sourcename: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SourceName", sourceSchema);
