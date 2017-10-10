/* eslint-disable import/no-extraneous-dependencies */
const { execSync, } = require('child_process');

const chalk = require('chalk');
const inquirer = require('inquirer');

function isCommitToGuardedBranch(guardedBranches) {
  const branch = execSync(
    'git rev-parse --abbrev-ref HEAD', { encoding: 'utf8', }
  ).split('\n')
    .filter(item => !!item)[0];

  if (guardedBranches.includes(branch)) {
    const message =
      `${chalk.yellow(
        `You are trying to commit directly into ${branch}`
      )}\n${chalk.white('Are you sure you this is a good idea?')}`;

    return inquirer.prompt([
      {
        type: 'confirm',
        name: 'continue',
        message,
        default: false,
      },
    ])
      .then(answers => {
        if (!answers.continue) {
          const errorMsg = `\nAborting commit into ${branch}`;
          console.error(`${chalk.red(errorMsg)}`);
          process.exit(1);
        }
      });
  }

  return Promise.resolve();
}

module.exports = isCommitToGuardedBranch;
