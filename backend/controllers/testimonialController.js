const Testimonial = require("../models/testimonialModel");
const cloudinary = require("../config/cloudinary");

// GET ALL (PUBLIC)
exports.getTestimonials = async (req, res) => {
  try {
    const data = await Testimonial.find().sort({ order: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE (ADMIN)
exports.createTestimonial = async (req, res) => {
  try {
    const { name, handle, followers } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const newItem = await Testimonial.create({
      name,
      handle,
      followers,
      image: req.file.path,
      public_id: req.file.filename
    });

    res.status(201).json(newItem);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deleteTestimonial = async (req, res) => {
  try {
    const item = await Testimonial.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Not found" });
    }

    await cloudinary.uploader.destroy(item.public_id);
    await Testimonial.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// REORDER
exports.reorderTestimonials = async (req, res) => {
  try {
    const { items } = req.body;

    const bulkOps = items.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { order: item.order }
      }
    }));

    await Testimonial.bulkWrite(bulkOps);

    res.json({ message: "Order updated" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};