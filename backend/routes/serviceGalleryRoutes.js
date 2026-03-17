const express = require("express");
const router = express.Router();

const {
  addGalleryImages,
  getServiceGallery,
  deleteGalleryImage
} = require("../controllers/serviceGalleryController");

const upload = require("../middleware/upload");


// UPLOAD MULTIPLE IMAGES
router.post("/:serviceId",upload.array("images", 30),addGalleryImages);

// GET GALLERY
router.get("/:serviceId", getServiceGallery);

// DELETE IMAGE
router.delete("/:id", deleteGalleryImage);

module.exports = router;