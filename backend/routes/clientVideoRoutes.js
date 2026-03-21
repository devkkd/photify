const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const { verifyAdmin } = require("../middleware/authMiddleware");

const {
  getClientVideos,
  createClientVideo,
  deleteClientVideo,
  reorderClientVideos
} = require("../controllers/clientVideoController");

// PUBLIC
router.get("/", getClientVideos);

// PROTECTED
router.post(
  "/",
  verifyAdmin,
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 }
  ]),
  createClientVideo
);

router.delete("/:id", verifyAdmin, deleteClientVideo);
router.put("/reorder", verifyAdmin, reorderClientVideos);

module.exports = router;