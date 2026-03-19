const express = require("express");
const router = express.Router();

const {
  createPackage,
  getPackages,
  updatePackage,
  deletePackage,
  reorderPackages
} = require("../controllers/packageController");

const { verifyAdmin } = require("../middleware/authMiddleware"); // ✅

// PUBLIC
router.get("/", getPackages);

// PROTECTED
router.post("/", verifyAdmin, createPackage);
router.delete("/:id", verifyAdmin, deletePackage);
router.put("/reorder", verifyAdmin, reorderPackages);
router.put("/:id", verifyAdmin, updatePackage);

module.exports = router;