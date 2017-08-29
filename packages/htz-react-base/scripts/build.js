/**
 * For building consumed libraries like `htz-components` ONLY currently.
 * Does not do Next.js app builds.
 */

process.env.BABEL_ENV = process.env.BABEL_ENV || 'production'
process.env.NODE_ENV = process.env.NODE_ENV || 'production'

if (!process.argv.length < 3) {
  // If no args are provided, use these defaults.
  process.argv.push(
    'src', // Folder to transpile.
    '--out-dir',
    'dist/lib', // Output directory.
    // Point to the default Babel config in case there's no babelrc.
    '--presets',
    require.resolve('../babel')
  )
}

require('babel-cli/bin/babel')
