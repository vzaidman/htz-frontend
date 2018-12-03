const spawn = require('cross-spawn');
const globby = require('globby');
const path = require('path');

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

const args = process.argv.slice(2);

// All arguments go to Prettier except for `--no-fix-lint`.
const fixLint = !args.includes('--no-fix-lint');
const bail = !args.includes('--no-bail');
const nonScriptArgs =
  fixLint && bail
    ? args
    : args.filter(arg => ![ '--no-fix-lint', '--no-bail', ].includes(arg));

const hasFileList = nonScriptArgs.includes('--files');
const fileListStartPosition = nonScriptArgs.indexOf(
  nonScriptArgs.indexOf('--files') + 1
);
const prettierArgs = hasFileList
  ? nonScriptArgs.slice(0, fileListStartPosition - 1)
  : nonScriptArgs;
const fileList = hasFileList
  ? nonScriptArgs.slice(fileListStartPosition)
  : getFileList();

const commands = [
  [
    'node',
    require.resolve(path.join('prettier')),
    ...prettierArgs,
    ...fileList,
  ],
];
if (fixLint) {
  commands.push([
    'node',
    require.resolve(path.join(__dirname, 'eslint-fix')),
    ...fileList,
  ]);
}

commands.forEach(command => {
  const result = spawn.sync(command[0], command.slice(1), { stdio: 'inherit', });
  if (bail) {
    if (result.error) {
      throw result.error;
    }
    if (result.signal) {
      console.error(result.signal);
      process.exit(1);
    }
    if (result.status) {
      process.exitCode = result.status;
    }
  }
});
