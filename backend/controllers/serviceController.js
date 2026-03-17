const Service = require("../models/serviceModel");
const ServiceGallery = require("../models/serviceGalleryModel");
const cloudinary = require("../config/cloudinary");


// GET ALL SERVICES
exports.getServices = async (req, res) => {
  try {

    const services = await Service.find().sort({ createdAt: -1 });

    res.json(services);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};



// GET SERVICE BY SLUG
exports.getServiceBySlug = async (req, res) => {
  try {

    const service = await Service.findOne({ slug: req.params.slug });

    if (!service) {
      return res.status(404).json({
        message: "Service not found"
      });
    }

    res.json(service);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};



// CREATE SERVICE
exports.createService = async (req, res) => {

  try {

    if (!req.files || !req.files.bannerImage || !req.files.specialImage) {
      return res.status(400).json({
        message: "Both images are required"
      });
    }

    const banner = req.files.bannerImage[0];
    const special = req.files.specialImage[0];


    const service = new Service({

      slug: req.body.id,

      title: req.body.title,

      subtitle: req.body.subtitle,

      bannerImage: banner.path,
      bannerPublicId: banner.filename,


      offers: JSON.parse(req.body.offers),


      specialSection: {

        title: req.body.specialTitle,

        image: special.path,
        imagePublicId: special.filename,

        points: JSON.parse(req.body.specialPoints)

      }

    });


    const savedService = await service.save();

    res.status(201).json(savedService);


  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// DELETE SERVICE
exports.deleteService = async (req, res) => {

  try {

    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        message: "Service not found"
      });
    }


    // delete banner image
    if (service.bannerPublicId) {
      await cloudinary.uploader.destroy(service.bannerPublicId);
    }


    // delete special section image
    if (service.specialSection.imagePublicId) {
      await cloudinary.uploader.destroy(service.specialSection.imagePublicId);
    }


    // delete gallery images
    const galleryImages = await ServiceGallery.find({
      serviceId: service._id
    });

    for (let img of galleryImages) {

      if (img.publicId) {
        await cloudinary.uploader.destroy(img.publicId);
      }

    }

    await ServiceGallery.deleteMany({
      serviceId: service._id
    });


    await service.deleteOne();

    res.json({
      message: "Service deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};