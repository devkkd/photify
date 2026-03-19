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
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    if (!req.files?.bannerImage || !req.files?.specialImage) {
      return res.status(400).json({
        message: "Both images are required"
      });
    }

    const banner = req.files.bannerImage[0];
    const special = req.files.specialImage[0];

    // SAFE PARSE
    let offers = [];
    let specialPoints = [];

    try {
      offers = req.body.offers ? JSON.parse(req.body.offers) : [];
      specialPoints = req.body.specialPoints
        ? JSON.parse(req.body.specialPoints)
        : [];
    } catch (err) {
      return res.status(400).json({
        message: "Invalid JSON format"
      });
    }

    const service = new Service({
      slug: req.body.slug, // ✅ FIXED
      title: req.body.title,
      subtitle: req.body.subtitle,

      bannerImage: banner.path,
      bannerPublicId: banner.filename,

      offers,

      specialSection: {
        title: req.body.specialTitle,
        image: special.path,
        imagePublicId: special.filename,
        points: specialPoints
      }
    });

    const savedService = await service.save();

    res.status(201).json(savedService);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message
    });
  }
};

// UPDATE SERVICE
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    // SAFE PARSE
    let offers = [];
    let specialPoints = [];

    try {
      offers = req.body.offers ? JSON.parse(req.body.offers) : [];
      specialPoints = req.body.specialPoints
        ? JSON.parse(req.body.specialPoints)
        : [];
    } catch (err) {
      return res.status(400).json({
        message: "Invalid JSON format"
      });
    }

    // ================= BASIC =================
    service.slug = req.body.slug || service.slug;
    service.title = req.body.title || service.title;
    service.subtitle = req.body.subtitle || service.subtitle;

    // ================= BANNER IMAGE =================
    if (req.files?.bannerImage) {
      // delete old
      if (service.bannerPublicId) {
        await cloudinary.uploader.destroy(service.bannerPublicId);
      }

      const banner = req.files.bannerImage[0];
      service.bannerImage = banner.path;
      service.bannerPublicId = banner.filename;
    }

    // ================= OFFERS =================
    if (offers.length > 0) {
      service.offers = offers;
    }

    // ================= SPECIAL SECTION =================
    service.specialSection.title =
      req.body.specialTitle || service.specialSection.title;

    if (req.files?.specialImage) {
      if (service.specialSection.imagePublicId) {
        await cloudinary.uploader.destroy(
          service.specialSection.imagePublicId
        );
      }

      const special = req.files.specialImage[0];
      service.specialSection.image = special.path;
      service.specialSection.imagePublicId = special.filename;
    }

    if (specialPoints.length > 0) {
      service.specialSection.points = specialPoints;
    }

    await service.save();

    res.json(service);

  } catch (error) {
    console.error(error);
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