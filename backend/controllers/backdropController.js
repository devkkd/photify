const Backdrop = require("../models/backdropModel");
const cloudinary = require("../config/cloudinary");

// GET
exports.getBackdrops = async (req, res) => {
  try {
    const backdrops = await Backdrop.find().sort({ order: 1 });
    res.json(backdrops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// MULTIPLE UPLOAD
exports.createBackdrop = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const images = req.files.map((file) => ({
      image: file.path,
      public_id: file.filename,
    }));

    const saved = await Backdrop.insertMany(images);

    res.status(201).json(saved);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
exports.deleteBackdrop = async (req, res) => {
  try {
    const item = await Backdrop.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Not found" });
    }

    await cloudinary.uploader.destroy(item.public_id);
    await Backdrop.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// REORDER
exports.reorderBackdrop = async (req, res) => {
  try {
    const { items } = req.body;

    const bulkOps = items.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { order: item.order },
      },
    }));

    await Backdrop.bulkWrite(bulkOps);

    res.json({ message: "Order updated" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};