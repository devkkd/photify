const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true
    },

    public_id: {
      type: String,
      required: true
    },

    order: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Portfolio", portfolioSchema);