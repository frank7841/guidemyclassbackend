const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userAccSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      // unique: true,
      match:
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },

    username: { type: String },
    role: {
      type: String,
      required: true,
    },
    phone_number: { type: String },
    password: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserAcc", userAccSchema);
