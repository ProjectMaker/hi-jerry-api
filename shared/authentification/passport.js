const bcrypt = require('bcrypt');
const passportJwt = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = passportJwt.Strategy;


const User = require('../models/user-model');
const AuthenticateError = require('../error/authenticate');



module.exports = function(passport) {
  const JWT_KEY = require('../config').jwtKey;
  const jwtOptions = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: JWT_KEY
  };

  passport.use(new JwtStrategy(jwtOptions, (jwtPayload, next) => {
    console.log('jwtPayload', jwtPayload)
    
    next(null, jwtPayload);
  }));


  passport.use('signin-local', new LocalStrategy({
      usernameField: 'email',
      passwordFiled: 'password',
      session: false
    },
    function(email, password, done) {
      console.log('signin-local', email, password)
      User.findOne({'authentication.local.email': email})
        .then((user) => {
          if (!user) return done(null, false, { code: 'signin:notfound', message: 'User not found'});
          if (!user.comparePassword(password)) return done(null, false, { code: 'signin:password', message: 'Wrong password'});
          return done(null, user);
        })
        .catch(err => {
          done(err);
        });
    }
  ));

  passport.use('signup-local', new LocalStrategy({
    usernameField: 'email',
    passwordFiled: 'password',
    session: false,
    passReqToCallback : true
  }, (req, email, password, done) => {
    User.findOne({ 'authentication.local.email': email})
      .then((user) => {
        if (!user) {
          const user = new User({
            authentication: {
              local: {
                email: email,
                hash_password: bcrypt.hashSync(password, 10)
              }
            },
            profile: {
              name: req.body.name
            }
          });
          console.log('Username', req.body.name);
          return user.save()
        } else throw new AuthenticateError('register:exists','All ready exists');
      })
      .then((user) => {
        delete user.hash_password;
        done(null, user);
      })
      .catch(err => {
        done(err);
      });
  }));

  passport.use('signin-facebook', new LocalStrategy({
    usernameField: 'email',
    session: false,
    passReqToCallback : true
  }, (req, email,password, done) => {
    User.findOne({ $or: [{ 'authentication.facebook.email': email },{ 'authentication.local.email': email}] })
      .then((user) => {
        if (user) {
          if (!user.authentication.facebook) {
            user.profile = {
              firstname: req.body.firstname,
              lastname: req.body.lastname
            };
          }
          user.authentication.facebook = {
            email: email,
            id: req.body.id,
            token: req.body.token
          };

          return user.save();
        }
        else {
          const user = new User({
            authentication: {
              local: {
                email: email,
                password: req.body.id,
                token: req.body.token
              }
            },
            profile: {
              firstname: req.body.firstname,
              lastname: req.body.lastname,
            }
          });
          return user.save()
        }
      })
      .then((user) => {
        done(null, user);
      })
      .catch(err => {
        done(err);
      });
    
    })
  );
}