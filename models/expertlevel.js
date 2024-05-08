const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const expertSchema = new Schema(
  {
    
    expertLevel: { type: String },
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("ExpertLevel", expertSchema);
