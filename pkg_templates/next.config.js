/* eslint-disable no-param-reassign */
const path = require('path');

const emptyShim = require.resolve(
  '@haaretz/htz-react-base/webpack/emptyShim'
);

/**
 * NOTE: Next.js builds the output directory in a temporary location before
 * replacing it at $PWD/.next. If you are referencing the .next directory
 * in any plugins in this config, you probably want to reference
 * `config.output.path` instead!
 */

module.exports = {
  webpack: (config, { dev, }) => {
    // Make sure `resolve.alias` exists.
    config.resolve.alias = config.resolve.alias || {};

    config.resolve.alias.config$ = require.resolve(
      '@haaretz/htz-react-base/webpack/configShim'
    );
    // These shims are needed for bunyan (logging)
    config.resolve.alias = {
      ...config.resolve.alias,
      'dtrace-provider': emptyShim,
      fs: emptyShim,
      'safe-json-stringify': emptyShim,
      mv: emptyShim,
      'source-map-support': emptyShim,
    };
    return config;
  },
};
