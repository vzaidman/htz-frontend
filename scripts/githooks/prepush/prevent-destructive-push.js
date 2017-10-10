/* eslint-disable import/no-extraneous-dependencies */
const { execSync, } = require('child_process');
const chalk = require('chalk');

const execSyncOpts = { encoding: 'utf8', };

/**
 * Prevent destructive push to permanent branches
 *
 * @param {string[]} [branches=['master', 'dev']] - A list of protected branches
 */
function preventDestructivePush(branches = [ 'master', 'dev', ]) {
  const branch = execSync('git rev-parse --abbrev-ref HEAD', execSyncOpts)
    .split('\n')
    .filter(item => !!item)[0];

  const isPermanent = branches.includes(branch);
  // exit if branch is not a permanent branch
  !isPermanent && process.exit(0);

  const pushCommand = process.env.GIT_COMMAND;
  const isPushToPermanent = branches.some(branchName =>
    pushCommand.includes(branchName)
  );
  const destructiveFlags = [ '-d ', '--delete ', '-f ', '--force ', ];
  const willDeletePermanent = branches.map(branchName => `:${branchName}`);

  const isDestructive =
    [ ...destructiveFlags, ...willDeletePermanent, ].filter(flag =>
      pushCommand.includes(flag)
    ).length > 0;

  if ((isPermanent && isDestructive) || (isPushToPermanent && isDestructive)) {
    try {
      const permanentBranchesRegex = new RegExp(
        branches.reduce(
          (regExpString, branchName, i) =>
            (i === 0 ? branchName : `${regExpString}|(?:${branchName})`),
          ''
        )
      );

      const permanentBranch = pushCommand.match(permanentBranchesRegex)[0];
      console.log(
        `${chalk.yellow(permanentBranch)} ${chalk.white(
          "is a permanent branch whose history musn't ever be rewritten."
        )}`
      );
      console.log('Deleting it or force-pushing to it is forbidden.');
      process.exit(1);
    }
    catch (err) {
      console.log(
        'Deleting or force-pushing to permanent branches is forbidden.'
      );
      process.exit(1);
    }
  }
}

module.exports = preventDestructivePush;
