#!/usr/bin/env node

/* eslint-disable import/no-extraneous-dependencies */
const spawn = require('cross-spawn');
const chalk = require('chalk');
const { execSync, } = require('child_process');

const LINT_STAGED_MESSAGE = '### LINT-STAGED: unstaged files';

// 1. Get latest stash message
const latestStashList = execSync('git stash list | head -n 1', {
  encoding: 'utf8',
});

// 2. check if it was created as part of the lint-staged process
const isLinkStagedStash = latestStashList.includes(LINT_STAGED_MESSAGE);

// 3. Unstash files if needed
if (isLinkStagedStash) {
  console.log('Unstashing unstaged files');
  const unstashResult = spawn.sync('git', [ 'stash', 'pop', ], {
    stdio: 'inherit',
  });

  // 4. Notify user if unstashing failed
  if (unstashResult !== 0) {
    console.log(
      chalk.black.bgMagenta.bold(
        'There was an error unstashing unstaged files\n'
      ),
      chalk.magenta.bold(
        'This usually means there were conflict created by the linter\n'
      ),
      chalk.magenta.bold('Please manually unstash your unstaged changes')
    );
  }
}
