/* eslint-disable import/no-extraneous-dependencies */
const { execSync, } = require('child_process');

const chalk = require('chalk');
const inquirer = require('inquirer');

const execSyncOpts = { encoding: 'utf8', };

function isFromMaster() {
  const [
    ,
    currentCommit,
    isBranchCheckoutString,
  ] = process.env.GIT_PARAMS.split(' ');

  const branch = execSync('git rev-parse --abbrev-ref HEAD', execSyncOpts)
    .split('\n')
    .filter(item => !!item)[0];

  // Do nothing if checking out a file
  if (!parseInt(isBranchCheckoutString, 10)) return Promise.resolve(true);

  // Do nothing if branch is created by pull
  if (
    execSync('git reflog -1', execSyncOpts)
      .split('\n')
      .filter(msg => !!msg)
      .join('')
      .includes('pull')
  ) {
    return Promise.resolve(true);
  }

  // Ignore checkouts that are not creating a new branch
  if (
    !execSync(`git reflog show ${branch}@{0} -1`, execSyncOpts).includes(
      'branch: Created'
    )
  ) {
    return Promise.resolve(true);
  }

  const lastCommitInMaster = execSync(
    'git rev-parse --short master',
    execSyncOpts
  )
    .split('\n')
    .filter(item => !!item)[0];

  const latestTag = execSync(
    'git rev-list --tags --max-count=1 --abbrev-commit',
    execSyncOpts
  )
    .split('\n')
    .filter(item => !!item)[0];

  // All checkouts from master or from a tag
  const fromPremittedBranch =
    currentCommit.startsWith(lastCommitInMaster) ||
    currentCommit.startsWith(latestTag);

  if (!fromPremittedBranch) {
    const message =
      `"${chalk.yellow(branch)}" did not branch off of "master".\n` +
      'Do you want me to delete it and recreate it from "master" for you?';

    return inquirer
      .prompt([
        {
          type: 'confirm',
          name: 'recreate',
          message,
          default: true,
        },
      ])
      .then(answers => {
        if (answers.recreate) {
          console.log(
            `${chalk.cyan(
              `\nDeleting "${branch}" and recreating it from "master"...`
            )}`
          );
          execSync('git checkout -q master');
          execSync(`git branch -qD ${branch}`);
          execSync(`git checkout -qb ${branch}`);
          console.log(
            `${chalk.cyan(`\n"${branch}" is now branched off of "master"`)}`
          );
        }
      });
  }

  return Promise.resolve(true);
}

module.exports = isFromMaster;
