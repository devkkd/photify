const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let resource_type = "image";

    if (file.mimetype.startsWith("video")) {
      resource_type = "video";
    }

    return {
      folder: "photify",
      resource_type,
    };
  },
});

// 🔒 FILE FILTER (ALLOW IMAGE + VIDEO)
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image") ||
    file.mimetype.startsWith("video")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only image and video files are allowed"), false);
  }
};

// 🔒 LIMITS (REALISTIC)
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB (adjust if needed)
  },
});

module.exports = upload;