const HiJerryError = require('./error');

function AuthenticateError(code, msg) {
  HiJerryError.call(this, code, msg);
  this.name = 'AuthenticateError';


}

/*!
 * Inherits from HiJerryError.
 */
AuthenticateError.prototype = Object.create(HiJerryError.prototype);
AuthenticateError.prototype.constructor = HiJerryError;

module.exports = AuthenticateError;