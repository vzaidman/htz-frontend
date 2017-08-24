// This is the way `react-scripts` runs Jest.

const jest = require('jest')
const argv = process.argv.slice(2)

argv.push(
  '--config',
  JSON.stringify({
    transform: {
      '^.+\\.(js|jsx)$': require.resolve('babel-jest')
    },
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
    // Jest's default test matcher thinks this is a test file because of the
    // name and throws an error, so ignore it.
    testPathIgnorePatterns: ['/node_modules/', '/scripts/test.js']
  })
)

jest.run(argv)
