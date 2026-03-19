const express = require("express");
const {
  loginAdmin,
  checkAuth,
  logoutAdmin,
} = require("../controllers/authController");

const { verifyAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/check", verifyAdmin, checkAuth);
router.post("/logout", logoutAdmin);

module.exports = router;