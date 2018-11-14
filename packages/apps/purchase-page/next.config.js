/* eslint-disable no-param-reassign */

/**
 * NOTE: Next.js builds the output directory in a temporary location before
 * replacing it at $PWD/.next. If you are referencing the .next directory
 * in any plugins in this config, you probably want to reference
 * `config.output.path` instead!
 */
const emptyShim = require.resolve('@haaretz/htz-react-base/webpack/emptyShim');
// Replace this with official npm version when an up to date version is released.
// Depends on https://github.com/zeit/next-plugins/issues/309
const withSourceMaps = require('./withSourceMaps')();

module.exports = withSourceMaps({
  // Dealing with multi-server deployment https://nextjs.org/docs/#customizing-webpack-config
  generateBuildId: async () => {
    // For example get the latest git commit hash here
    // Since this is a production-only issue, provide this as an environment variable at prod
    const revision = process.env.NEXT_BUILD_ID || 'LATEST';
    console.log(`Next App BuildID is: ${revision}`);
    return revision;
  },
  pageExtensions: [ 'jsx', 'js', ],
  webpack: (config, { buildId, dev, isServer, defaultLoaders, }) => {
    // node_modules sourcemap support
    config.module.rules.push({
      test: /\.(jsx|jsm|js)$/,
      use: [ 'source-map-loader', ],
      enforce: 'pre',
      // Only get source maps from haaretz packages
      exclude: /node_modules(?!@haaretz)/,
    });

    if (!config.resolve) config.resolve = {};
    if (!config.resolve.alias) config.resolve.alias = {};
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
});
