// This is inspired by the way `react-scripts` runs Jest.
const path = require('path');
const jest = require('jest');

const packageInfo = require(path.join(process.cwd(), 'package.json'));

const argv = process.argv.slice(2);
const defaultConfig = {
  transform: {
    '^.+\\.jsx?$': require.resolve('babel-jest'),
  },
  transformIgnorePatterns: [ '[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$', ],
  // Jest's default test matcher thinks this is a test file because of the
  // name and throws an error, so ignore it.
  testPathIgnorePatterns: [ '/node_modules/', '/dist/', '/scripts/test.js', ],
};
// Allow overrides from package.json.
const config = Object.assign({}, defaultConfig, packageInfo.jest);

argv.push('--config', JSON.stringify(config));

jest.run(argv);
