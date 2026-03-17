const express = require("express");

const router = express.Router();

router.get("/photos", (req, res) => {
  res.json([
    { id: 1, title: "Photo 1" },
    { id: 2, title: "Photo 2" }
  ]);
});

module.exports = router;