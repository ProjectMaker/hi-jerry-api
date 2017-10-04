const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  authentication: {
    local: {
      email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
      },
      hash_password: {
        type: String,
        required: true
      }
    },
    facebook: {
      email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
      },
      id: {
        type: String,
        required: true,
        trim: true
      },
      token: {
        type: String,
        required: true,
        trim: true
      }
    }
  },
  lastname: {
    type: String
  },
  firstname: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.methods.comparePassword = function(password) {
  console.log('comparePassword', password, this.email);
  return bcrypt.compareSync(password, this.authentication.local.hash_password);
};

module.exports = mongoose.model("User", userSchema);