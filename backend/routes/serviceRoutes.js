const express = require("express");
const router = express.Router();

const {
  getServices,
  getServiceBySlug,
  createService,
  deleteService,
  updateService
} = require("../controllers/serviceController");

const upload = require("../middleware/upload");
const { verifyAdmin } = require("../middleware/authMiddleware"); // ✅ ADD THIS

// ✅ PUBLIC ROUTES (keep open)
router.get("/", getServices);
router.get("/:slug", getServiceBySlug);

// 🔐 PROTECTED ROUTES

// CREATE SERVICE
router.post(
  "/",
  verifyAdmin, // ✅ PROTECT FIRST
  upload.fields([
    { name: "bannerImage", maxCount: 1 },
    { name: "specialImage", maxCount: 1 }
  ]),
  createService
);

// UPDATE SERVICE
router.put(
  "/:id",
  verifyAdmin, // ✅ PROTECT
  upload.fields([
    { name: "bannerImage", maxCount: 1 },
    { name: "specialImage", maxCount: 1 }
  ]),
  updateService
);

// DELETE SERVICE
router.delete(
  "/:id",
  verifyAdmin, // ✅ PROTECT
  deleteService
);

module.exports = router;