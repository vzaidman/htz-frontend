const path = require('path');

const [ , , /* executor */ /* executee */ ...args ] = process.argv;
const filesSpecifierPosition = args.indexOf('--files');
const prettierRcPath = path.join(__dirname, 'prettierrc');

// If no options are provided, use these defaults.
if (!args.some(arg => arg.startsWith('-'))) {
  process.argv.push(
    // Overwrite files.
    '--write',

    // prettier-ignore-next-line
    '--config',
    prettierRcPath
  );
}
else if (!args.includes('--config')) {
  if (filesSpecifierPosition !== -1) {
    process.argv.splice(filesSpecifierPosition, 0, '--config', prettierRcPath);
  }
  else process.argv.push('--config', 'prettierRcPath');
}

// eslint-disable-next-line import/no-unresolved
require('prettier/bin/prettier');
