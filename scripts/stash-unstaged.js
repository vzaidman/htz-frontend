#!/usr/bin/env node

/* eslint-disable import/no-extraneous-dependencies */
const spawn = require('cross-spawn');

// 1. Stash ALL unstaged files so that we can operate
console.log('Stashing unstaged files');
const stashResult = spawn.sync(
  'git',
  [
    'stash',
    'push',
    '--include-untracked',
    '--keep-index',
    '--message',
    '### LINT-STAGED: unstaged files',
  ],
  { stdio: 'inherit', }
);

// 2. Throw if staging failed
if (stashResult.status !== 0) {
  throw new Error(
    'There was an error stashing unstaged files. Please take care of it manually and try again.'
  );
}
