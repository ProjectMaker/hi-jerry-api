const passport = require('passport');

module.exports = (app) => {
  app.use('/auth', require('./auth/auth-routes'));
  app.use('/place', passport.authenticate('jwt', { session: false }), require('./place/place-routes'));

  app.use('/experience-waiting', passport.authenticate('jwt', { session: false }), require('./experience-waiting/experience-waiting-routes'));
  app.use('/experience', passport.authenticate('jwt', { session: false }), require('./experience/experience-routes'));
  app.use('/friend', passport.authenticate('jwt', { session: false }), require('./friend/friend-routes'));
  app.use('/user', passport.authenticate('jwt', { session: false }), require('./user/user-routes'));
};