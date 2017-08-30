const { findConfig } = require('../../styleguide');

process.argv.splice(2, 0, 'server');

// If no --config parameter is specified, find one using `findConfig`.
if (!process.argv.slice(3).some(arg => arg.match(/^--config(=|$)/))) {
  process.argv.push('--config', findConfig());
}

require('react-styleguidist/bin/styleguidist');
