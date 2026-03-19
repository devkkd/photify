const Package = require("../models/packageModel");

// CREATE
exports.createPackage = async (req, res) => {
  try {
    const newPackage = await Package.create(req.body);
    res.status(201).json(newPackage);
  } catch (error) {
    console.error("CREATE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// GET
exports.getPackages = async (req, res) => {
  try {
    const packages = await Package.find().sort({ order: 1 });
    res.json(packages);
  } catch (error) {
    console.error("GET ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
exports.updatePackage = async (req, res) => {
  try {
    const updated = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE
exports.deletePackage = async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.json({ message: "Package deleted" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// 🔥 REORDER (THIS WAS MISSING / BROKEN)
exports.reorderPackages = async (req, res) => {
  try {
    console.log("BODY:", req.body); // 👈 MUST ADD

    const { items } = req.body;

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    const bulkOps = items.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { order: item.order }
      }
    }));

    console.log("BULK OPS:", bulkOps); // 👈 MUST ADD

    await Package.bulkWrite(bulkOps);

    res.json({ message: "Reordered successfully" });
  } catch (error) {
    console.error("REORDER ERROR:", error); // 👈 THIS IS KEY
    res.status(500).json({ message: error.message });
  }
};