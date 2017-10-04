const passport = require('passport');
const passportJwt = require('passport-jwt');
const jwt = require('jsonwebtoken');

const JWT_KEY = 'yoyoyo';
const ExtractJwt = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: JWT_KEY
};

const strategy = new JwtStrategy(jwtOptions, (jwtPayload, next) => {
  next(null, jwtPayload);
});
passport.use(strategy);

module.exports = {
  sign: (user) => jwt.sign(user, JWT_KEY, { expiresIn: '1d' }),
  initialize: () => passport.initialize(),
  authenticate: () => passport.authenticate('jwt', { session: false })
}