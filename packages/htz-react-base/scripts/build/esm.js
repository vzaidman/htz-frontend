process.env.BABEL_ENV = process.env.BABEL_ENV || 'esm'

console.log('Building dist/esm...')

if (process.argv.length < 3) {
  process.argv.push('src', '--out-dir', 'dist/esm')
}

require('babel-cli/bin/babel')
