const Portfolio = require("../models/portfolioModel");
const cloudinary = require("../config/cloudinary");

// MULTIPLE UPLOAD
exports.createPortfolio = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const images = req.files.map((file) => ({
      image: file.path,
      public_id: file.filename,
    }));

    const saved = await Portfolio.insertMany(images);

    res.json(saved);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET
exports.getPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find().sort({ order: 1 });
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
exports.deletePortfolio = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Portfolio.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Not found" });
    }

    await cloudinary.uploader.destroy(item.public_id);
    await Portfolio.findByIdAndDelete(id);

    res.json({ message: "Deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// REORDER
exports.reorderPortfolio = async (req, res) => {
  try {
    const { items } = req.body;

    const bulkOps = items.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { order: item.order },
      },
    }));

    await Portfolio.bulkWrite(bulkOps);

    res.json({ message: "Order updated" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};