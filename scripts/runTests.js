/* eslint-disable import/no-extraneous-dependencies */
/**
 * This script is used to only run tests in packages in which
 * changes were committed.
 */
const path = require('path');
const spawn = require('cross-spawn');

const repoDir = process.cwd();

// Extract list of stages `js` files.
const [ , , ...filePaths ] = process.argv;

// Sort staged `js` into packages
const packages = filePaths.reduce((result, file) => {
  const newResult = result;
  const pathArray = path.relative(repoDir, file).split(path.sep);
  const packageDir = pathArray.slice(0, 3).join(path.sep);
  const fileRelativeToPackage = pathArray.slice(3).join(path.sep);

  if (newResult[packageDir]) {
    newResult[packageDir].push(fileRelativeToPackage);
    return newResult;
  }

  newResult[packageDir] = [ fileRelativeToPackage, ];
  return newResult;
}, {});

// Run tests in each package separately (in case different packages have different settings)
Object.keys(packages).forEach(packageDir =>
  runTestsLocally(packageDir, packages[packageDir])
);

function runTestsLocally(packageDir, files) {
  const jestResult = spawn.sync(
    'cross-env',
    [ 'yarn', 'run', 'test', '--coverage', '--findRelatedTests', '--passWithNoTests', ...files, ],
    {
      cwd: packageDir,
      stdio: 'inherit',
    }
  );

  if (jestResult.status !== 0) process.exitCode = jestResult.status;
}
