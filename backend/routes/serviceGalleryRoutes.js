const express = require("express");
const router = express.Router();

const {
  addGalleryImages,
  getServiceGallery,
  deleteGalleryImage,
  updateGalleryOrder,
  getAllServiceGallery
} = require("../controllers/serviceGalleryController");

const upload = require("../middleware/upload");
const { verifyAdmin } = require("../middleware/authMiddleware"); // ✅ ADD THIS

// ✅ PUBLIC ROUTES
router.get("/:serviceId", getServiceGallery);
router.get("/", getAllServiceGallery);

// 🔐 PROTECTED ROUTES

// UPLOAD MULTIPLE IMAGES
router.post(
  "/:serviceId",
  verifyAdmin, // ✅ MUST BE FIRST
  upload.array("images", 30),
  addGalleryImages
);

// DELETE IMAGE
router.delete(
  "/:id",
  verifyAdmin,
  deleteGalleryImage
);

// UPDATE ORDER
router.put(
  "/reorder",
  verifyAdmin,
  updateGalleryOrder
);

module.exports = router;