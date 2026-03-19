const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  createPortfolio,
  getPortfolios,
  deletePortfolio,
  reorderPortfolio
} = require("../controllers/portfolioController");

const { verifyAdmin } = require("../middleware/authMiddleware"); // ✅ ADD THIS

// ✅ PUBLIC ROUTE
router.get("/", getPortfolios);

// 🔐 PROTECTED ROUTES

// MULTIPLE UPLOAD
router.post(
  "/",
  verifyAdmin, // ✅ FIRST
  upload.array("images", 10),
  createPortfolio
);

// DELETE
router.delete(
  "/:id",
  verifyAdmin,
  deletePortfolio
);

// REORDER
router.put(
  "/reorder",
  verifyAdmin,
  reorderPortfolio
);

module.exports = router;