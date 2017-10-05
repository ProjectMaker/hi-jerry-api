const passport = require('passport');

module.exports = (app) => {
  app.use('/auth', require('./auth/auth-routes'));
  app.use('/place', passport.authenticate('jwt', { session: false }), require('./place/place-routes'));
}