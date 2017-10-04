
/**
 * HiJerryError constructor
 *
 * @param {String} msg Error message
 * @inherits Error https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error
 */

function HiJerryError(code, msg) {
  Error.call(this);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this);
  } else {
    this.stack = new Error().stack;
  }

  this.message = msg;
  this.code = code;
  this.name = 'HiJerryError';
}

/*!
 * Inherits from Error.
 */

HiJerryError.prototype = Object.create(Error.prototype);
HiJerryError.prototype.constructor = Error;
HiJerryError.prototype.toJSON = function() {
  return { name: this.name, code: this.code, message: this.message };
};
HiJerryError.prototype.getString = function() {
  return JSON.stringify(this.toJSON());
};

module.exports = HiJerryError;
