const spawn = require('cross-spawn');
const globby = require('globby');

/*
 * Until the next version of Prettier is released with better ignore pattern
 * support, do the globbing here. Otherwise, the built files in .next
 * directories get formatted.
 */
function getFileList() {
  return globby.sync(
    [
      '**/*.{js,jsx}',
      '!**/{.jest,.next,dist,node_modules,packages}/**',
      '!./{.jest,.next,dist,node_modules,packages}/**',
    ],
    { dot: true, }
  );
}

// All arguments go to Prettier except for `--no-fix-lint`.
const args = process.argv.slice(2);
const prettierArgs = args.filter(arg => arg !== '--no-fix-lint');
const fixLint = args.indexOf('--no-fix-lint') === -1;
const fileList = getFileList();

const commands = [
  [ 'node', require.resolve('./prettier'), ...prettierArgs, ...fileList, ],
];
if (fixLint) {
  commands.push([ 'node', require.resolve('./eslint-fix'), ...fileList, ]);
}

commands.forEach(command => {
  const result = spawn.sync(command[0], command.slice(1), { stdio: 'inherit', });
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
});
