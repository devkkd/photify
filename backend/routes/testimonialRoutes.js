const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const { verifyAdmin } = require("../middleware/authMiddleware");

const {
  getTestimonials,
  createTestimonial,
  deleteTestimonial,
  reorderTestimonials
} = require("../controllers/testimonialController");

// PUBLIC
router.get("/", getTestimonials);

// PROTECTED
router.post("/", verifyAdmin, upload.single("image"), createTestimonial);

router.delete("/:id", verifyAdmin, deleteTestimonial);

router.put("/reorder", verifyAdmin, reorderTestimonials);

module.exports = router;