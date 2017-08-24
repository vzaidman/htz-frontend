/**
 * For building consumed libraries like `htz-components` ONLY currently.
 * Does not do Next.js app builds.
 */

if (!process.argv.length < 3) {
  // If no args are provided, use these defaults.
  process.argv.push(
    'src', // Folder to transpile.
    '--out-dir=lib', // Output directory.
    '--presets',
    require.resolve('../babel')
  )
}

require('babel-cli/bin/babel')
