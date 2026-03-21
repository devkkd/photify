require("dotenv").config(); // MUST be first

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const equipmentRoutes = require("./routes/equipmentRoutes");
const packageRoutes = require("./routes/packageRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const backdropRoutes = require("./routes/backdropRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const serviceGalleryRoutes = require("./routes/serviceGalleryRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const clientVideoRoutes = require("./routes/clientVideoRoutes");

const app = express();

// DB
connectDB();

// 🔥 MIDDLEWARES
app.use(express.json());
app.use(cookieParser());

// ⚠️ CORS (THIS IS CRITICAL FOR AUTH)
app.use(
  cors({
    origin: "http://localhost:3000", // your frontend
    credentials: true,
  })
);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Running");
});

// 🔐 AUTH ROUTES
app.use("/api/auth", authRoutes);

// 🔴 YOUR ROUTES (WILL PROTECT NEXT STEP)
app.use("/api/categories", categoryRoutes);
app.use("/api/equipments", equipmentRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/backdrops", backdropRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/service-gallery", serviceGalleryRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/client-videos", clientVideoRoutes);

// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});