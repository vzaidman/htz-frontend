const args = process.argv.slice(2);

// Unfortunately, eslint doesn't just lint the current directory by default -
// it requires a path to lint. To know if we should add '.' to the argument
// list, check if any args were passed. If any arg whatsoever was passed, then
// the user must also specify the path they wish to lint, instead of us adding
// the current directory by default.
if (!args.length) {
  process.argv.push('.');
}

// If no --ignore-pattern parameter is specified, use this default.
// The typical `eslintignore` files and locations will be considered in addition
// to this parameter.
if (!args.some(arg => arg.match(/^--ignore-pattern(=|$)/))) {
  process.argv.push('--ignore-pattern', '.jest/*');
  process.argv.push('--ignore-pattern', '.next/*');
  process.argv.push('--ignore-pattern', 'dist/*');
  process.argv.push('--ignore-pattern', 'node_modules/*');
  process.argv.push('--ignore-pattern', 'packages/*');
  process.argv.push('--ignore-pattern', 'docs/*');
}

require('eslint/bin/eslint');
