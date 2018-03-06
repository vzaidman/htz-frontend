const path = require('path');

// If no options are provided, use these defaults.
if (!process.argv.slice(2).some(arg => arg.startsWith('-'))) {
  process.argv.push(
    // Overwrite files.
    '--write',

    // prettier-ignore-next-line
    '--config',
    path.join(__dirname, 'prettierrc')
  );
}

// eslint-disable-next-line import/no-unresolved
require('prettier/bin/prettier');
