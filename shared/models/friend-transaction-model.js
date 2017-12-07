const mongoose = require('mongoose');

const friendTransactionSchema = new mongoose.Schema({
  source: {
    _id: String,
    name: String,
  },
  target: {
    _id: String,
    name: String
  },
  approuv: Boolean,
  request: {
    type: Boolean,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("FriendTransaction", friendTransactionSchema);