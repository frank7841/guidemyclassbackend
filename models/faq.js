const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const faqSchema = new Schema(
  {
    question: {
      type: String,
    },
    answer: {
      type: String,
    },
    status: { type: String, enum: ["0", "1"], default: "1" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Faq", faqSchema);
