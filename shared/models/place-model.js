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
  formattedAddress: {
    type: String,
    default: "",
    trim: true,
    required: true
  },
  location: {
    type: Object
  },
  placeId: {
    type: String,
    default: "",
    trim: true,
    required: true
  },
  types: {
    type: Array
  },
  phoneNumber: {
    type: String
  },
  contexts: {
    type: Array,
  },
  comment: {
    type: String,
  },
  note: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Place", placeSchema);