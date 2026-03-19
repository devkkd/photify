const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  getBackdrops,
  createBackdrop,
  deleteBackdrop,
  reorderBackdrop
} = require("../controllers/backdropController");

const { verifyAdmin } = require("../middleware/authMiddleware"); // ✅

// PUBLIC
router.get("/", getBackdrops);

// PROTECTED
router.post(
  "/",
  verifyAdmin,
  upload.array("images", 10), // 🔥 reduced from 30
  createBackdrop
);

router.delete("/:id", verifyAdmin, deleteBackdrop);
router.put("/reorder", verifyAdmin, reorderBackdrop);

module.exports = router;