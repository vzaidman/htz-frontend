/* eslint-disable import/no-extraneous-dependencies */
/**
 * Sync dependencies as specified in the `syncDependencies` command of the root
 * `package.json` file.
 */
const spawn = require('cross-spawn');
const globby = require('globby');
const updatePackageJson = require('./update-package-json');
const rootPackage = require('../package.json');

const syncDependencies = rootPackage.syncDependencies || {};

// Update `package.json` files matched by each glob.
Object.keys(syncDependencies).forEach(glob => {
  const packagePaths = globby.sync(glob);
  const mergeData = syncDependencies[glob];
  packagePaths.forEach(packagePath => {
    updatePackageJson(packagePath, mergeData);
  });
});

// Run `lerna bootstrap` at the end so the updates are actually installed.
const result = spawn.sync('lerna', [ 'bootstrap', ], { stdio: 'inherit', });
if (result.error) {
  throw result.error;
}
if (result.signal) {
  console.error(result.signal);
  process.exit(1);
}
if (result.status) {
  process.exit(result.status);
}
