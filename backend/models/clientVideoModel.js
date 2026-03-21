const mongoose = require("mongoose");

const clientVideoSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: true
    },

    handle: {
      type: String,
      required: true
    },

    video: {
      type: String,
      required: true
    },

    video_public_id: {
      type: String,
      required: true
    },

    thumbnail: {
      type: String
    },

    thumbnail_public_id: {
      type: String
    },

    order: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ClientVideo", clientVideoSchema);