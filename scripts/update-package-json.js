/* eslint-disable import/no-extraneous-dependencies */
/**
 * Given a `package.json` path and a JSON string, merge the passed JSON object
 * into the specified file, keeping `dependencies` etc. sorted. Used by the
 * `sync` script. This module can either be imported (in which case you get the
 * `updatePackageJson` function, or run as a standalone script (in which case
 * the path and JSON are script arguments).
 */
const fs = require('fs');
const path = require('path');
const writePkg = require('write-pkg');

/**
 * Modify `target` with values deeply merged from `source` object.
 * @param {object} target - The object to modify.
 * @param {object} source - The object from which to copy values.
 * @return {object} The updated `target` object.
 */
function mergeDeep(target, source) {
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const targetIsObject = target[key] && typeof target[key] === 'object';
      const sourceIsObject = source[key] && typeof source[key] === 'object';
      if (targetIsObject && sourceIsObject) {
        mergeDeep(target[key], source[key]);
      }
      else {
        // eslint-disable-next-line no-param-reassign
        target[key] = source[key];
      }
    }
  }
  return target;
}

/**
 * Update the `package.json` file at `packagePath` with data from `mergeData`
 * by merging it using `mergeDeep`.
 * @param {string} packagePath - Path to a `package.json` file, or a directory containing one.
 * @param {object} mergeData - The values to add to the package data.
 * @param {object} [options] - An options object
 * @param {boolean} [options.quite=false] - Mute all console output
 */
function updatePackageJson(packagePath, mergeData, { quiet = false, } = {}) {
  let packageFile = path.relative(process.cwd(), packagePath);
  if (path.basename(packageFile) !== 'package.json') {
    packageFile = path.join(packageFile, 'package.json');
  }

  if (!quiet) {
    console.log(`Updating ${packageFile}...`);
  }
  const packageData = JSON.parse(fs.readFileSync(packageFile, 'utf8'));
  writePkg.sync(packageFile, mergeDeep(packageData, mergeData));
}

module.exports = updatePackageJson;

// If this script is being run directly, parse arguments and call `updatePackageJson`.
if (require.main === module) {
  if (process.argv.length < 4) {
    console.error(`Usage: ${path.basename(process.argv[1])} <path> <JSON>`);
    process.exit(1);
  }
  updatePackageJson(process.argv[2], JSON.parse(process.argv[3]));
}
