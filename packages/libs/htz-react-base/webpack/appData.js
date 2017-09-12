/* global window */
const appData = window.__HTZ_DATA__;

if (!appData) {
  console.warn('No __HTZ_DATA__ detected.');
}

module.exports = appData || {};
