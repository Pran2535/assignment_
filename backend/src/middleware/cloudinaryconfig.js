const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "events", // Cloudinary folder name
    allowed_formats: ["jpg", "jpeg", "png", "gif"], // Allowed file types
  },
});

// Initialize multer with Cloudinary storage
const upload = multer({ storage });

module.exports = { upload, cloudinary };
