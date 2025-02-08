const Event = require("../models/Event");

// Create a new event
exports.createEvent = async (req, res, next) => {
  try {
    const { title, description, date, location, category } = req.body;
    const event = new Event({
      title,
      description,
      date,
      location,
      category,
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

    // Update event details
    const { title, description, date, location, category } = req.body;
    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.location = location || event.location;
    event.category = category || event.category;

    await event.save();
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

// Delete an event (only by owner)
exports.deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    res.status(200).json({ message: "Event removed" });
  } catch (error) {
    next(error);
  }
};
