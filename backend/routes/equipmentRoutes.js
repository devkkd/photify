const express = require("express");
const router = express.Router();

const {
  createEquipment,
  getEquipments
} = require("../controllers/equipmentController");

const upload = require("../middleware/upload");
const { verifyAdmin } = require("../middleware/authMiddleware"); // ✅

// PUBLIC
router.get("/", getEquipments);

// PROTECTED
router.post(
  "/",
  verifyAdmin,
  upload.single("image"),
  createEquipment
);

module.exports = router;