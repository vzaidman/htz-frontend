module.exports = (config) => ({
  ...config
  styleguideComponents: {
    ...config.styleguideComponents,
    Wrapper: require.resolve('./src/style/StyleProvider')
  }
})
