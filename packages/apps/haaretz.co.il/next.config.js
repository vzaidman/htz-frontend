/* eslint-disable no-param-reassign */
// const path = require('path');

/**
 * NOTE: Next.js builds the output directory in a temporary location before
 * replacing it at $PWD/.next. If you are referencing the .next directory
 * in any plugins in this config, you probably want to reference
 */

module.exports = {
  webpack: (config, { dev, }) => {
    config.resolve.alias = config.resolve.alias || {};

    config.resolve.alias.config$ = require.resolve(
      '@haaretz/htz-react-base/webpack/configShim'
    );

    return config;
  },
};
