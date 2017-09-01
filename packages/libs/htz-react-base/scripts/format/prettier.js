// If no options are provided, use these defaults.
if (!process.argv.slice(2).some(arg => arg.startsWith('-'))) {
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
}

require('prettier/bin/prettier');
