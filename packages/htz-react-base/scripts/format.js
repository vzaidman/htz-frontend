const globby = require('globby');

/*
 * Until the next version of Prettier is released with better ignore pattern
 * support, do the globbing here. Otherwise, the built files in .next
 * directories get formatted.
 */
function getFileList() {
  return globby.sync(
    [
      '**/*.{js,jsx}',
      '!**/{.next,dist,node_modules}/**',
      '!./{.next,dist,node_modules}/**',
    ],
    { dot: true, }
  );
}

if (!process.argv.length < 3) {
  // If no args are provided, use these defaults.
  process.argv.push(
    // Overwrite files.
    '--write',
    // The number of spaces per indentation level
    // prettier-ignore-next-line
    '--tab-width',
    '2',
    // Prefer single-quoted strings.
    '--single-quote',
    // Prefer dangling commas everywhere except in functions
    // prettier-ignore-next-line
    '--trailing-comma',
    'es5',
    // Put the > of a multi-line JSX element at the end
    // of the last line instead of being alone on the next line.
    '--jsx-bracket-same-line'
  );
  // eslint-disable-next-line prefer-spread
  process.argv.push.apply(process.argv, getFileList());
}

require('prettier/bin/prettier');
