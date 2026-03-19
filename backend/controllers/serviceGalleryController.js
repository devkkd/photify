const ServiceGallery = require("../models/serviceGalleryModel");
const cloudinary = require("../config/cloudinary");


// ADD GALLERY IMAGES
exports.addGalleryImages = async (req,res)=>{
  try{

    const { serviceId } = req.params;

    if(!req.files || req.files.length === 0){
      return res.status(400).json({
        message:"No images uploaded"
      });
    }

    const images = req.files.map((file)=>({
      serviceId: serviceId,
      image: file.path,
      publicId: file.filename
    }));

    const savedImages = await ServiceGallery.insertMany(images);

    res.status(201).json(savedImages);

  }
  catch(err){
    res.status(500).json({
      message: err.message
    });
  }
};



// GET GALLERY
exports.getServiceGallery = async (req,res)=>{
  try{

    const { serviceId } = req.params;

    const images = await ServiceGallery
      .find({ serviceId })
      .sort({ order: 1 });

    res.status(200).json(images);

  }
  catch(err){
    res.status(500).json({
      message: err.message
    });
  }
};



// DELETE IMAGE
exports.deleteGalleryImage = async (req,res)=>{
  try{

    const { id } = req.params;

    const image = await ServiceGallery.findById(id);

    if(!image){
      return res.status(404).json({
        message:"Image not found"
      });
    }

    await cloudinary.uploader.destroy(image.publicId);

    await ServiceGallery.findByIdAndDelete(id);

    res.status(200).json({
      message:"Image deleted successfully"
    });

  }
  catch(err){
    res.status(500).json({
      message: err.message
    });
  }
};

// UPDATE ORDER
exports.updateGalleryOrder = async (req, res) => {
  try {
    const { items } = req.body; // [{id, order}]

    const bulkOps = items.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { order: item.order },
      },
    }));

    await ServiceGallery.bulkWrite(bulkOps);

    res.status(200).json({ message: "Order updated" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getAllServiceGallery = async (req, res) => {
  try {
    const images = await ServiceGallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};