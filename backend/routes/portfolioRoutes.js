const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  createPortfolio,
  getPortfolios
} = require("../controllers/portfolioController");

router.post("/", upload.single("image"), createPortfolio);
router.get("/", getPortfolios);

module.exports = router;