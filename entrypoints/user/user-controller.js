const User = require('./user-model');
const bcrypt = require('bcrypt');
const authentification = require('../../shared/authentification');
const AuthenticateError = require('../../shared/error/authenticate');


class UserController {
  static register(req, res) {
    User.findOne({ 'authentication.local.email': req.body.email})
      .then((user) => {
        if (!user) {
          const user = new User({
            authentication: {
              local: {
                email: req.body.email,
                hash_password: bcrypt.hashSync(req.body.password, 10)
              }
            },
            firstname: req.body.firstname,
            lastname: req.body.lastname,
          });
          return user.save()
        } else throw new AuthenticateError('register:exists','All ready exists');
      })
      .then((user) => {
        delete user.hash_password;
        return res.json(user);
      })
      .catch(err => {
        res.status(500).json({code: err.code, message: err.message})
      });
  }

  static signIn(req, res) {
    User.findOne({ 'authentication.local.email': req.body.email})
      .then((user) => {
        if (!user) throw new AuthenticateError('signin:notfound', 'User not found');
        if (!user.comparePassword(req.body.password)) throw new AuthenticateError('signin:password', 'Wrong password');

        return res.json({token: authentification.sign({ email: user.authentication.local.email, _id: user._id, firstname: user.firstname })});
      })
      .catch(err => {
        res.status(500).json({code: err.code, message: err.message})
      });
  }

  static signInFacebook(req, res) {
    User.findOne({ $or: [{ 'authentication.facebook.email': req.body.email },{ 'authentication.local.email': req.body.email}] })
      .then((user) => {
        if (user) {
          user.authentication.facebook = {
            email: req.body.email,
            id: req.body.id,
            token: req.body.token
          };
          user.firstname = req.body.firstname;
          user.lastname = req.body.lastname;
          return user.save();
        }
        else {
          const user = new User({
            authentication: {
              facebook: {
                email: req.body.email,
                id: req.body.id,
                token: req.body.token
              }
            },
            firstname: req.body.firstname,
            lastname: req.body.lastname,
          });
          return user.save()
        }
      })
      .then((user) => {
        return res.json({token: authentification.sign({ email: req.body.email, _id: user._id, firstname: user.firstname })});
      })
      .catch(err => {
        res.status(500).json({code: err.code, message: err.message})
      });
  }

  static loginRequired (req, res, next) {
    if (req.user) {
      next();
    } else {
      return res.status(401).json({ message: 'Unauthorized user!' });
    }
  }
}

module.exports = UserController;

