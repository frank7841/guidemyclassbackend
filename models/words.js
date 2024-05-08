const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const wordsSchema = new Schema(
  {
    words: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Words", wordsSchema);
