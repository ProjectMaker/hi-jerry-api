const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  authentication: {
    local: {
      email: {
        type: String,
        lowercase: true,
        trim: true,
        required: authLocalRequired
      },
      hash_password: {
        type: String,
        required: authLocalRequired
      }
    },
    facebook: {
      email: {
        type: String,
        lowercase: true,
        trim: true,
        required: authFacebookRequired
      },
      id: {
        type: String,
        required: authFacebookRequired,
        trim: true
      },
      token: {
        type: String,
        required: authFacebookRequired,
        trim: true
      }
    }
  },
  profile: {
    lastname: {
      type: String
    },
    firstname: {
      type: String
    },
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

function authLocalRequired() {
  return !(this.authentication && this.authentication.facebook)
}

function authFacebookRequired() {
  return !(this.authentication && this.authentication.local)
}

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.authentication.local.hash_password);
};

module.exports = mongoose.model("User", userSchema);