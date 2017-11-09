const spawn = require('cross-spawn');
const { execSync, } = require('child_process');

const args = process.argv.slice(2);
const gitRoot = execSync('git rev-parse --show-toplevel', { encoding: 'utf8', })
  .split('\n')
  .filter(item => !!item)[0];

process.chdir(gitRoot);

const result = spawn.sync('git', [ 'cz', ...args, ], { stdio: 'inherit', });

if (result.error) {
  throw result.error;
}
if (result.signal) {
  console.error(result.signal);
  process.exit(1);
}
if (result.status) {
  process.exit(result.status);
}
