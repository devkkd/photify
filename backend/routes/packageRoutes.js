const express = require("express");
const router = express.Router();

const {
  createPackage,
  getPackages,
  updatePackage,
  deletePackage
} = require("../controllers/packageController");

router.post("/", createPackage);
router.get("/", getPackages);
router.put("/:id", updatePackage);
router.delete("/:id", deletePackage);

module.exports = router;