const mongoose = require("mongoose");

const serviceGallerySchema = new mongoose.Schema(
{
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true
  },

  image: {
    type: String,
    required: true
  },

  publicId: {
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

module.exports = mongoose.model("ServiceGallery", serviceGallerySchema);