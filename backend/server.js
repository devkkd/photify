require("dotenv").config(); // MUST be first line

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const categoryRoutes = require("./routes/categoryRoutes");
const equipmentRoutes = require("./routes/equipmentRoutes");
const packageRoutes = require("./routes/packageRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const backdropRoutes = require("./routes/backdropRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const serviceGalleryRoutes = require("./routes/serviceGalleryRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api/categories", categoryRoutes);
app.use("/api/equipments", equipmentRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/backdrops", backdropRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/service-gallery", serviceGalleryRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});