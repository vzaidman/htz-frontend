#!/usr/bin/env node

/* eslint-disable import/no-extraneous-dependencies */
const { execSync, } = require('child_process');

function hasPartiallyStagedFiles() {
  // 1. Get list of staged files
  const stagedFiles = getChangedFiles(true);
  // 2. Get list of changed files that are tracked but no staged
  const changedButUnstagedFiles = getChangedFiles(false);

  return changedButUnstagedFiles.some(item => stagedFiles.includes(item));
}

module.exports = hasPartiallyStagedFiles;

function getChangedFiles(isStaged) {
  return execSync(`git diff --name-only${isStaged ? ' --cached' : ''}`, {
    encoding: 'utf8',
  })
    .split('\n')
    .filter(item => !!item);
}
