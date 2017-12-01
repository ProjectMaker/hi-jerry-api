const mongoose = require('mongoose');

const experienceWaitingSchema = new mongoose.Schema({
  contexts: Array,
  note: Number,
  comment: String,
  place: {
    _id: String,
    name: String,
    placeId: String
  },
  user: {
    _id: String,
    name: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("ExperienceWaiting", experienceWaitingSchema);