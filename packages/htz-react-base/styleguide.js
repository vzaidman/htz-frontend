const resolveFrom = require('resolve-from');

function configure(config) {
  const defaultConfig = require('./styleguide.config.js');
  if (typeof config === 'function') {
    return config(defaultConfig);
  }
  return Object.assign({}, defaultConfig, config);
}

function findConfig() {
  // Find a config file relative to the current directory.
  const configFile = resolveFrom.silent(
    process.cwd(),
    './styleguide.config.js'
  );
  // Be a bit lenient: if there's a config file, but it's empty (including an
  // empty object), stick to the default.
  if (configFile) {
    try {
      const config = require(configFile);
      if (config && Object.keys(config).length) {
        return configFile;
      }
    } catch (err) {
      // If there's an error, we'd prefer letting Styleguidist report it rather
      // than doing it ourselves, so attempt to load it anyway.
      return configFile;
    }
  }
  // Use the default config file.
  return require.resolve('./styleguide.config.js');
}

module.exports = {
  configure,
  findConfig
};
