process.env.BABEL_ENV = process.env.BABEL_ENV || 'commonjs';

console.log('Building dist/lib...');
const fs = require('fs');
const { checkDir, } = require('./_checkDir');

checkDir('dist').then(hasDist => {
  if (!hasDist) {
    fs.mkdirSync('dist');
  }
  const watchIndex = process.argv.indexOf('watch');
  if (watchIndex !== -1) process.argv.splice(watchIndex, 1);
  if (process.argv.length < 3) {
    process.argv.push('src', '--source-maps', '--out-dir', 'dist/lib');
  }
  if (watchIndex > -1) {
    process.argv.push('--watch');
  }

  require('@babel/cli/bin/babel');
});
