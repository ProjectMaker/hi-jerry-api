const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const JWT_KEY = require('../../shared/config').jwtKey;


class AuthController {
  static createJWToken(email, id) {
    return jwt.sign({ email, id }, JWT_KEY, { expiresIn: '1d' })
  }

  static register(req, res, next) {
    passport.authenticate('signup-local', (err, user, info) => {
      console.log('signup-local');
      if (err) {
        res.status(500).json({code: err.code, message: err.message})
        return false;
      }
      console.log('uouououo');
      return res.json(user);
    })(req, res, next);
  }

  static signIn(req, res, next) {
    passport.authenticate('signin-local', (err, user, info) => {
      if (err) {
        res.status(500).json({code: err.code, message: err.message})
        return false;
      } else if (!user) {
        res.json({code: info.code, message: info.message})
        return false;
      }
      return res.json({token: AuthController.createJWToken(user.authentication.local.email, user._id)});
    })(req, res, next);
  }

  static signInFacebook(req, res, next) {
    passport.authenticate('signin-facebook', (err, user, info) => {
      if (err) {
        res.status(500).json({code: err.code, message: err.message})
        return false;
      }

      return res.json({token: AuthController.createJWToken(user.authentication.facebook.email, user._id)});
    })(req, res, next);
  }
}

module.exports = AuthController;

