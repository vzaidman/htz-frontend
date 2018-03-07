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
  setupFiles: [
    `${__dirname}/jestRAFPolyfill.js`,
    `${__dirname}/enzyme-setup.js`,
    `${__dirname}/fetch-mock-setup.js`,
    'jest-localstorage-mock',
  ],
  testEnvironment: 'jest-environment-jsdom-global',
  snapshotSerializers: [ 'enzyme-to-json/serializer', ],
  transform: {
    '^.+\\.jsx?$': require.resolve('babel-jest'),
  },
  transformIgnorePatterns: [ '[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$', ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/docs/',
    '__mocks__',
    '/__tests__/helpers/',
    '/fixtures/',
    // Jest's default test matcher thinks this is a test file because of the
    // name and throws an error, so ignore it.
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

argv.unshift('--config', JSON.stringify(config), '--passWithNoTests');
jest.run(argv);
