const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    date: {
      type: Date,
      required: [true, "Please add a date"],
    },
    location: {
      type: String,
      required: [true, "Please add a location"],
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
    },
    image: {
      type: String, // Stores Cloudinary URL
      required: false, // Optional, since some events may not have images
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
