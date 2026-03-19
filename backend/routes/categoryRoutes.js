const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories
} = require("../controllers/categoryController");

const { verifyAdmin } = require("../middleware/authMiddleware"); // ✅

// PUBLIC
router.get("/", getCategories);

// PROTECTED
router.post("/", verifyAdmin, createCategory);

module.exports = router;