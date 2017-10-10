/* eslint-disable import/no-extraneous-dependencies */
const spawn = require('cross-spawn');

const warnUnresolved = require('./warn-unresolved');
const isCommitToGuardedBranch = require('./is-commit-to-guarded-branch');

const lintStagedPath = require.resolve('lint-staged');

const [ executor /* command */, , ...args ] = process.argv;

async function runHooks() {
  // eslint-disable-next-line no-unused-vars
  const unresolveTest = await warnUnresolved();

  console.log();

  // eslint-disable-next-line no-unused-vars
  const guardedBranchsTest = await isCommitToGuardedBranch([ 'master', 'dev', ]);

  console.log();

  const lintStaged = spawn.sync(
    executor,
    // Pass commandline arguments to lint-staged
    [ lintStagedPath, ].concat(args),
    { stdio: 'inherit', }
  );

  return lintStaged.status;
}

runHooks().then(status => process.exit(status));
