const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  getBackdrops,
  createBackdrop,
  deleteBackdrop
} = require("../controllers/backdropController");

router.get("/", getBackdrops);

router.post("/", upload.single("image"), createBackdrop);

router.delete("/:id", deleteBackdrop);

module.exports = router;