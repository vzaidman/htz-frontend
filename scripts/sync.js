/* eslint-disable import/no-extraneous-dependencies */
/**
 * Sync dependencies as specified in the `syncDependencies` property of the root
 * `package.json` file.
 */
const deepMerge = require('deepmerge');
const globby = require('globby');
const rootPackage = require('../package.json');
const spawn = require('cross-spawn');
const updatePackageJson = require('./update-package-json');

const syncDependencies = rootPackage.syncDependencies || {};
const [ executer, command, ...args ] = process.argv;

// Managing cross-dependencies between packages by denoting which
// package(s) uses what dependencies and how, is the most efficient way to
// do it in order to programmatically update the different packages'
// `package.json` file, but it is cumbersome and prone to duplication
// and error.
// It is much easier to just specify package names, and then how
// (dependencies|devDependencies|peerDependencies) and where each
// version of a package is used.
// Hence - in `package.json`, `syncDependencies` will be defined as it
// is in the expamle below, and remapped to the optimal structure for
// programmatically handling them:
//
// ```json
// "syncDependencies": {
//   // `dependencyName` must always be a string, so glob arrays will be:
//   // "['packages/libs/*', '!pacages/libs/htz-react-base']": { ... }
//   "<dependencyName>": {
//     "<dependencyVersionRange": {
//       "<packagesGlobPattern>": ["dependencies"?, "devDependencies"?, "peerDependencies"?]
//     }
//   }
// }
// ```
const dependencyMap = Object.keys(
  syncDependencies
).reduce((mapping, depName) => {
  let newMapping = mapping;

  const dep = syncDependencies[depName];
  for (const version in dep) {
    if (Object.prototype.hasOwnProperty.call(dep, version)) {
      for (const glob in dep[version]) {
        if (Object.prototype.hasOwnProperty.call(dep[version], glob)) {
          // eslint-disable-next-line no-loop-func
          dep[version][glob].forEach(depType => {
            newMapping = deepMerge(newMapping, {
              [glob]: {
                [depType]: {
                  [depName]: version,
                },
              },
            });
          });
        }
      }
    }
  }

  return newMapping;
}, {});

// Update `package.json` files matched by each glob.
Object.keys(dependencyMap).forEach(glob => {
  const packagePaths = globby.sync(parseGlob(glob));
  const mergeData = dependencyMap[glob];
  packagePaths.forEach(packagePath => {
    updatePackageJson(packagePath, mergeData);
  });
});

// Run `lerna bootstrap` at the end so the updates are actually installed.
const result = spawn.sync('lerna', [ 'bootstrap', ...args, ], { stdio: 'inherit', });
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

// Parse a glob-like string into a real glob pattern.
function parseGlob(globString) {
  try {
    const glob = JSON.parse(globString);
    return glob;
  }
  catch (e) {
    return globString;
  }
}
