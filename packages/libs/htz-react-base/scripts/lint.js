const args = process.argv.slice(2);

/**
 * Use current directory as path argument to eslint if no path was provided
 * We assume that any argument that starts with '-' is a flag to eslint and
 * not a path.
 */
if (args.every(arg => arg.startsWith('-'))) {
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
