const Equipment = require("../models/equipmentModel");

exports.createEquipment = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const equipment = await Equipment.create({
      name: req.body.name,
      category: req.body.category,
      image: req.file.path
    });

    res.status(201).json(equipment);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEquipments = async (req, res) => {
  try {
    const equipments = await Equipment.find().populate("category");
    res.json(equipments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};