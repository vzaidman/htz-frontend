process.argv.splice(2, 0, 'server')

// If no --config parameter is specified, use the default configuration from
// this module, which supports overrides anyway.
if (!process.argv.slice(3).some(arg => arg.match(/^--config(=|$)/))) {
  process.argv.push('--config', require.resolve('../../styleguide.config.js'))
}

require('react-styleguidist/bin/styleguidist')
