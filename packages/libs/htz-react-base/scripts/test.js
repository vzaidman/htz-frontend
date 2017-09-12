// This is inspired by the way `react-scripts` runs Jest.
const path = require('path');
const jest = require('jest');
const resolveFrom = require('resolve-from');

process.env.NODE_ENV = 'test';
process.env.BABEL_ENV = 'commonjs';

const packageInfo = require(path.join(process.cwd(), 'package.json'));
const configFile = resolveFrom.silent(process.cwd(), './jest.config.js');

const argv = process.argv.slice(2);
const defaultConfig = {
  cacheDirectory: '.jest',
  transform: {
    '^.+\\.jsx?$': require.resolve('babel-jest'),
  },
  transformIgnorePatterns: [ '[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$', ],
  // Jest's default test matcher thinks this is a test file because of the
  // name and throws an error, so ignore it.
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/scripts/test.js',
    '/config/test.js',
  ],
};

let config;

// Prefer overrides from `jest.config.js`, then `package.json`.
if (configFile) {
  config = Object.assign({}, defaultConfig, require(configFile));
}
else if (packageInfo.jest) {
  config = Object.assign({}, defaultConfig, packageInfo.jest);
}
else {
  config = defaultConfig;
}

argv.push('--config', JSON.stringify(config));

jest.run(argv);
