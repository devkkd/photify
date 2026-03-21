const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    handle: {
      type: String,
      required: true
    },

    followers: {
      type: String,
      required: true
    },

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

module.exports = mongoose.model("Testimonial", testimonialSchema);