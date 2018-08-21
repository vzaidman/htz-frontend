/* eslint-disable import/no-extraneous-dependencies */
/**
 * This script is used to only lint changed files
 */
const path = require('path');
const spawn = require('cross-spawn');
const hasPartiallyStagedFiles = require('./hasPartiallyStagedFiles');

const repoDir = process.cwd();

// Extract list of stages `js` files.
const [ , , ...args ] = process.argv;

const noBailOnError = Array.isArray(args) && args[0] === '--no-bail';
const options = [ '--write', '--files', ];

if (noBailOnError) options.unshift('--no-bail');

const filePaths = noBailOnError ? args.slice(1) : args;

// Sort staged `js` into packages
const packages = filePaths.reduce((result, file) => {
  const newResult = result;
  const pathArray = path.relative(repoDir, file).split(path.sep);
  const isPackage = pathArray[0] === 'packages';
  const packageDir = isPackage
    ? pathArray.slice(0, 3).join(path.sep)
    : `.${path.sep}`;
  const fileRelativeToPackage = isPackage
    ? pathArray.slice(3).join(path.sep)
    : pathArray.join(path.sep);

  if (newResult[packageDir]) {
    newResult[packageDir].push(fileRelativeToPackage);
    return newResult;
  }

  newResult[packageDir] = [ fileRelativeToPackage, ];
  return newResult;
}, {});

// Lint files in each package separately (in case different packages have different settings)
Object.keys(packages).forEach(packageDir =>
  lintLocally(packageDir, packages[packageDir])
);

function lintLocally(packageDir, files) {
  // To avoid merge conflicts on `stash pop` which partially staged files exist,
  // don't apply prettier and only lint without automatically fixing.
  if (hasPartiallyStagedFiles()) {
    const eslintResult = spawn.sync('yarn', [ 'run', 'lint', ...files, ], {
      cwd: packageDir,
      stdio: 'inherit',
    });

    if (eslintResult.status !== 0) process.exitCode = eslintResult.status;
  }

  // Otherwise, prettify and automatically fix linting errors when possible
  else {
    const formatResult = spawn.sync(
      'yarn',
      [ 'run', 'format', ...options, ...files, ],
      {
        cwd: packageDir,
        stdio: 'inherit',
      }
    );

    if (formatResult.status !== 0 && !noBailOnError) {
      process.exitCode = formatResult.status;
    }
  }
}
