const Event = require("../models/Event");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary (Ensure you have your credentials in environment variables)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create a new event with image upload
exports.createEvent = async (req, res, next) => {
  try {
    const { title, description, date, location, category } = req.body;
    let imageUrl = "";

    // Handle image upload if a file is provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "events",
      });
      imageUrl = result.secure_url;
    }

    const event = new Event({
      title,
      description,
      date,
      location,
      category,
      image: imageUrl,
      createdBy: req.user.id,
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

// Get all events
exports.getEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

// Get a single event by ID
exports.getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

// Update an event (only by owner)
exports.updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Verify ownership
    if (event.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { title, description, date, location, category } = req.body;
    let imageUrl = event.image;

    // Handle image update if a new file is provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "events",
      });
      imageUrl = result.secure_url;
    }

    // Update event details
    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.location = location || event.location;
    event.category = category || event.category;
    event.image = imageUrl;

    await event.save();
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

// Delete an event (only by owner)
exports.deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Verify ownership
    if (event.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Remove image from Cloudinary
    if (event.image) {
      const publicId = event.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`events/${publicId}`);
    }

    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Event removed" });
  } catch (error) {
    next(error);
  }
};
