/**
 * Remove built distribution files and the Jest cache.
 * If you update this script, you may want to update the `clean` script in
 * the root `package.json` as well.
 */
const path = require('path');
const spawn = require('cross-spawn');

const testArgs = [ require.resolve('./test'), '--showConfig', ];
const result = spawn.sync('node', testArgs, { encoding: 'utf8', });
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
const jestConfig = JSON.parse(result.stdout).config;

if (process.argv.length < 3) {
  if (jestConfig.cacheDirectory) {
    let cachePath = jestConfig.cacheDirectory;
    // Show relative to the current directory only if it's a sibling or
    // descendent.
    if (jestConfig.cacheDirectory.startsWith(process.cwd())) {
      cachePath = path.relative('.', cachePath);
    }
    process.argv.push(cachePath);
  }

  process.argv.push('.next', 'dist');
}

process.argv.slice(2).forEach(path => {
  console.log(`- ${path}`);
});
require('rimraf/bin');
