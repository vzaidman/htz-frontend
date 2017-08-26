const args = process.argv.slice(2)

// Unfortunately, eslint doesn't just lint the current directory by default -
// it requires a path to lint. To know if we should add '.' to the argument
// list, check if any args were passed. If any arg whatsoever was passed, then
// the user must also specify the path they wish to lint, instead of us adding
// the current directory by default.
if (!args.length) {
  process.argv.push('.')
}

// If no --config parameter is specified, use the default from this module.
if (!args.some(arg => arg.match(/^-(c|-config)(=|$)/))) {
  const config = require.resolve('../eslint')
  process.argv.push('--config', config)
}

require('eslint/bin/eslint')
