const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const academicLevelSchema = new Schema(
  {
    academicLevel: { type: String },
    amount: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AcademicLevel", academicLevelSchema);
