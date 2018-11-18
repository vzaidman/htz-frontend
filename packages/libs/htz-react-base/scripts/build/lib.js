process.env.BABEL_ENV = process.env.BABEL_ENV || 'commonjs';

console.log('Building dist/lib...');
const { checkDir, } = require('./_checkDir');
const fs = require('fs');

checkDir('dist').then(hasDist => {
  if (!hasDist) {
    fs.mkdirSync('dist');
  }
  const watchIndex = process.argv.indexOf('watch');
  process.argv.splice(watchIndex, 1);
  if (process.argv.length < 3) {
    process.argv.push('src', '--source-maps', '--out-dir', 'dist/lib');
  }
  if (watchIndex > -1) {
    process.argv.push('--watch');
  }

  require('@babel/cli/bin/babel');
});
