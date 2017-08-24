// This is the way `react-scripts` runs Jest.

const jest = require('jest')
const argv = process.argv.slice(2)

argv.push(
  '--config',
  JSON.stringify({
    transform: {
      '^.+\\.(js|jsx)$': require.resolve('babel-jest')
    },
    transformIgnorePatterns: ['[/\\]node_modules[/\\].+.(js|jsx)$']
  })
)

jest.run(argv)
