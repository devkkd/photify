const express = require("express");
const router = express.Router();

const {
  getServices,
  getServiceBySlug,
  createService,
  deleteService
} = require("../controllers/serviceController");

const upload = require("../middleware/upload");



// GET ALL SERVICES
router.get("/", getServices);


// GET SERVICE BY SLUG
router.get("/:slug", getServiceBySlug);


// CREATE SERVICE
router.post(
  "/",
  upload.fields([
    { name: "bannerImage", maxCount: 1 },
    { name: "specialImage", maxCount: 1 }
  ]),
  createService
);


// DELETE SERVICE
router.delete("/:id", deleteService);


module.exports = router;