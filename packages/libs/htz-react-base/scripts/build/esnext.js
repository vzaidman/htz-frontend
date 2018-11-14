process.env.BABEL_ENV = process.env.BABEL_ENV || 'esnext';

console.log('Building dist/esnext...');

if (process.argv.length < 3) {
  process.argv.push('src', '--source-maps', '--out-dir', 'dist/esnext');
}

require('@babel/cli/bin/babel');
