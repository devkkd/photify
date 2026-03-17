const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    price: {
      type: String,
      required: true
    },

    duration: {
      type: String,
      required: true
    },
    order: {
      type: Number,
      default: 0
    },

    features: [
      {
        type: String,
        required: true
      }
    ],

    perfectFor: [
      {
        type: String,
        required: true
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Package", packageSchema);