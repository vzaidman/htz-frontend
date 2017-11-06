/* eslint-disable import/no-extraneous-dependencies */
/**
 * This script is used to only run tests in packages in which
 * changes were committed.
 */
const path = require('path');
const spawn = require('cross-spawn');
const { execSync, } = require('child_process');

const repoDir = process.cwd();

// Stash unstaged files,
// 1. Store the current stash list to check if anything was added to it,
//    and needs to be unstashed at the end
const initialStashList = execSync('git stash list', { encoding: 'utf8', });
// 2. Stash ALL unstaged files so that tests broken by them don't make
//    our pre-commit tests fail.
const stashResult = spawn.sync('git', [ 'stash', 'save', '-u', '-k', ], {
  stdio: 'inherit',
});

if (stashResult.status !== 0) {
  throw new Error(
    'There was an error stashing unstaged files. Please take care of it manually and try again'
  );
}
// 3. Store the updated stash list so we can check if anything needs to be
//    restored when we are all done.
const updatedStashList = execSync('git stash list', { encoding: 'utf8', });
const changesWereStashed = initialStashList !== updatedStashList;

// Extract list of stages `js` files.
const [ , , ...filePaths ] = process.argv;

// Sort staged `js` into packages
const packages = filePaths.reduce((result, file) => {
  const newResult = result;
  const pathArray = path.relative(repoDir, file).split(path.sep);
  const packageDir = pathArray.slice(0, 3).join(path.sep);
  const fileRelativeToPackage = pathArray.slice(4).join(path.sep);

  if (newResult[packageDir]) {
    newResult[packageDir].push(fileRelativeToPackage);
    return newResult;
  }

  newResult[packageDir] = [ fileRelativeToPackage, ];
  return newResult;
}, {});

// Run tests in each package seperately (in case different packages have different settings)
Object.keys(packages).forEach(packageDir =>
  runTestsLocally(packageDir, packages[packageDir])
);

if (changesWereStashed) execSync('git stash pop', { encoding: 'utf8', });

function runTestsLocally(packageDir, files) {
  const jestResult = spawn.sync('yarn', [ 'run', 'test', '--coverage', ], {
    cwd: packageDir,
    stdio: 'inherit',
  });

  if (jestResult.status !== 0) {
    if (changesWereStashed) execSync('git stash pop', { encoding: 'utf8', });
    process.exit(jestResult.status);
  }
}
