const express = require("express");
const router = express.Router();

const {
  createEquipment,
  getEquipments
} = require("../controllers/equipmentController");

const upload = require("../middleware/upload");

router.post("/", upload.single("image"), createEquipment);
router.get("/", getEquipments);

module.exports = router;