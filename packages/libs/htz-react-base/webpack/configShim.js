/* eslint-disable no-var */
/**
 * This is a browser shim for the `config` module. It reads configuration
 * from `./appData`, which reads it from `window.__HTZ_DATA__`, which can either
 * be set via webpack or in the Next.js Document class. The functions below are
 * just reimplementations of their `config` equivalents. Why do we import
 * `./appData` instead of reading `window.__HTZ_DATA__` here directly? Because
 * this allows us to more easily mock its contents, if necessary.
 *
 * NOTE: Since this file does not currently get transpiled, it must use syntax
 * that UglifyJS supports.
 */
var config = require('./appData').config || {};

/**
 * Get the dot-notation key path `property` from `obj`, returning `undefined`
 * if it doesn't exist.
 *
 * @param {object} obj - The source object.
 * @param {(string|string[])} property - The key path to read on `obj`.
 * @returns {*} The value of the given property on `obj`.
 */
function getSafe(obj, property) {
  var keys = Array.isArray(property) ? property : property.split('.');
  var value = obj;
  var key;
  while (keys.length) {
    if (value === null || typeof value !== 'object') {
      value = undefined;
      break;
    }
    key = keys.shift();
    value = value[key];
  }
  return value;
}

/**
 * Like `getSafe`, but throw an error if the value is undefined.
 * Emulates the `get()` method from `config`.
 *
 * @param {object} obj - The source object.
 * @param {(string|string[])} property - The key path to read on `obj`.
 * @returns {*} The value of the given property on `obj`.
 */
function get(obj, property) {
  var keyPath = Array.isArray(property) ? property.join('.') : property;
  var value = getSafe(obj, property);
  if (value === undefined) {
    // eslint-disable-next-line
    throw new Error('Configuration property "' + keyPath + '" is not defined');
  }
  return value;
}

/**
 * Emulates the `has()` method from `config`.
 *
 * @param {object} obj - The source object.
 * @param {(string|string[])} property - The key path to read on `obj`.
 * @returns {boolean} Whether or not the given property is defined in `obj`
 */
function has(obj, property) {
  if (property === null || property === undefined) {
    return false;
  }
  return getSafe(obj, property) !== undefined;
}

config.get = get.bind(config, config);
config.has = has.bind(config, config);

module.exports = config;
