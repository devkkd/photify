const Backdrop = require("../models/backdropModel");
const cloudinary = require("../config/cloudinary");


// GET all backdrops
exports.getBackdrops = async (req, res) => {
  try {
    const backdrops = await Backdrop.find().sort({ order: 1 });

    res.json(backdrops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ADD backdrop
exports.createBackdrop = async (req, res) => {
  try {
    const backdrop = new Backdrop({
      image: req.file.path,
      public_id: req.file.filename
    });

    const saved = await backdrop.save();

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE backdrop
exports.deleteBackdrop = async (req, res) => {
  try {
    const backdrop = await Backdrop.findById(req.params.id);

    if (!backdrop) {
      return res.status(404).json({ message: "Backdrop not found" });
    }

    await cloudinary.uploader.destroy(backdrop.public_id);

    await backdrop.deleteOne();

    res.json({ message: "Backdrop deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};