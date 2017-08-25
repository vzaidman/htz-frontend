const path = require('path')
const resolveFrom = require('resolve-from')

module.exports = {
  title: 'Haaretz Components',
  showCode: true,
  showUsage: true,
  sections: [
    {
      name: 'Components',
      components: path.join(process.cwd(), '{,src/}components/**/*.js')
    }
  ],
  theme: {
    sidebarWidth: 240
  },
  getComponentPathLine(componentPath) {
    return path.relative(process.cwd(), componentPath)
  },
  // Ideally, we'd be able to use Next's webpack config, so everything works
  // the same when used in a Next app, but they don't expose it.
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: require('./babel')
        }
      ]
    }
  }
}

// Allow consuming modules to override the default configuration above.
if (process.cwd() !== __dirname) {
  const configFile = resolveFrom.silent(process.cwd(), 'styleguide.config.js')
  if (configFile) {
    const config = require(configFile)
    if (config) {
      if (typeof config === 'function') {
        module.exports = config(module.exports)
      } else {
        module.exports = config
      }
    }
  }
}
