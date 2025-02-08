const express = require("express");
const router = express.Router();
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const { protect } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/cloudinaryconfig"); // Import Cloudinary upload middleware

router
  .route("/")
  .get(getEvents)
  .post(protect, upload.single("image"), createEvent);

router
  .route("/:id")
  .get(getEventById)
  .put(protect, upload.single("image"), updateEvent) // Allow image update
  .delete(protect, deleteEvent);

module.exports = router;
