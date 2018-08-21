/* eslint-disable import/no-extraneous-dependencies */

const hasPartiallyStagedFiles = require('./hasPartiallyStagedFiles');

if (!hasPartiallyStagedFiles()) {
  const spawn = require('cross-spawn');
  const repoDir = process.cwd();
  const [ , , /* executor */ /* executee */ ...files ] = process.argv;

  const gitAddResult = spawn.sync('git', [ 'add', ...files, ], {
    cwd: repoDir,
    stdio: 'inherit',
  });

  if (gitAddResult !== 0) process.exitCode = gitAddResult.status;
}
