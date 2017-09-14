/* global window */
/* eslint-disable no-var */
/**
 * NOTE: Since this file does not currently get transpiled, it must use syntax
 * that UglifyJS supports.
 */
var appData = window.__HTZ_DATA__;

if (!appData) {
  console.warn('No __HTZ_DATA__ detected.');
}

module.exports = appData || {};
