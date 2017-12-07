const mongoose = require('mongoose');
const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
    trim: true,
    required: true
  },
  address: {
    type: Object
  },
  location: {
    type: Object,
    required: true
  },
  placeId: {
    type: String,
    default: "",
    trim: true,
    required: true
  },
  user: {
    _id: String,
    name: String,
  },
  types: {
    type: Array
  },
  openHours: {
    type: Array
  },
  phone: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  experiences: Array
});

module.exports = mongoose.model("Place", placeSchema);