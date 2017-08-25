const globby = require('globby')

/**
 * Until the next version of Prettier is released with better ignore pattern
 * support, do the globbing here. Otherwise, the built files in .next
 * directories get formatted.
 */
function getFileList() {
  return globby.sync(
    [
      '**/*.js{,x}',
      '!**/{.next,dist,node_modules}/**',
      '!./{.next,dist,node_modules}/**'
    ],
    { dot: true }
  )
}

if (!process.argv.length < 3) {
  // If no args are provided, use these defaults.
  // TODO: Update with Haaretz team's preferences.
  process.argv.push(
    '--write', // Overwrite files.
    '--no-semi', // Omit semicolons.
    '--single-quote' // Prefer single-quoted strings.
  )
  process.argv.push.apply(process.argv, getFileList())
}

require('prettier/bin/prettier')
