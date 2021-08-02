const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  img: {
    data: Buffer,
    contentType: String,
  },
  created_at: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Event", eventSchema, "events");
