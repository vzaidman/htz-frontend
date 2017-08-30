process.env.BABEL_ENV = process.env.BABEL_ENV || 'commonjs'

console.log('Building dist/lib...')

if (process.argv.length < 3) {
  process.argv.push('src', '--out-dir', 'dist/lib')
}

require('babel-cli/bin/babel')
