const ClientVideo = require("../models/clientVideoModel");
const cloudinary = require("../config/cloudinary");

// GET ALL (PUBLIC)
exports.getClientVideos = async (req, res) => {
  try {
    const data = await ClientVideo.find().sort({ order: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE (ADMIN)
exports.createClientVideo = async (req, res) => {
  try {
    const { review, handle } = req.body;

    if (!req.files || !req.files.video) {
      return res.status(400).json({ message: "Video is required" });
    }

    const videoFile = req.files.video[0];
    const thumbFile = req.files.thumbnail?.[0];

    const newItem = await ClientVideo.create({
      review,
      handle,
      video: videoFile.path,
      video_public_id: videoFile.filename,
      thumbnail: thumbFile?.path || "",
      thumbnail_public_id: thumbFile?.filename || ""
    });

    res.status(201).json(newItem);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deleteClientVideo = async (req, res) => {
  try {
    const item = await ClientVideo.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Not found" });
    }

    // delete video
    await cloudinary.uploader.destroy(item.video_public_id, {
      resource_type: "video"
    });

    // delete thumbnail (if exists)
    if (item.thumbnail_public_id) {
      await cloudinary.uploader.destroy(item.thumbnail_public_id);
    }

    await ClientVideo.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// REORDER
exports.reorderClientVideos = async (req, res) => {
  try {
    const { items } = req.body;

    const bulkOps = items.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { order: item.order }
      }
    }));

    await ClientVideo.bulkWrite(bulkOps);

    res.json({ message: "Order updated" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};