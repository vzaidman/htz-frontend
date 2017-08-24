module.exports = {
  title: 'Haaretz Components',
  showCode: true,
  showUsage: true,
  sections: [
    {
      name: 'Shared Components',
      components: 'src/components/{,!(haaretz.co.il|haaretz.com)/**}*.js'
    },
    {
      name: 'Site-Specific Components',
      sections: [
        {
          name: 'haaretz.co.il',
          components: 'src/components/haaretz.co.il/**/*.js'
        },
        {
          name: 'haaretz.com',
          components: 'src/components/haaretz.com/**/*.js'
        }
      ]
    }
  ],
  theme: {
    sidebarWidth: 240
  },
  styleguideComponents: {
    Wrapper: require.resolve('./src/style/StyleProvider')
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
          options: require('next/babel')
        }
      ]
    }
  }
}
