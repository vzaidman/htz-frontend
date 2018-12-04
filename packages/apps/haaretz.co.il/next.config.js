/* eslint-disable no-param-reassign */

// //////////////// //
//   Next Plugins   //
// //////////////// //

const withTranspiledModules = require('next-plugin-transpile-modules');

// Replace this with official npm version when an up to date version is released.
// Depends on https://github.com/zeit/next-plugins/issues/309
const withSourceMaps = require('./withSourceMaps')();

/**
 * NOTE: Next.js builds the output directory in a temporary location before
 * replacing it at $PWD/.next. If you are referencing the .next directory
 * in any plugins in this config, you probably want to reference
 * `config.output.path` instead!
 */
const emptyShim = require.resolve('@haaretz/htz-react-base/webpack/emptyShim');
const config = {
  // withTranspiledModules({
  // TODO: For some reason next-plugin-transpile-modules doesn't seem to work for actually
  //       transpiling modules, but it does force the use of the 'module' field instead of
  //       the 'main' field in imported modules.
  // transpileModules: [ '@haaretz', ],

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
    // defaultLoaders.babel.options.presets = [ '@babel/preset-flow', ];
    // defaultLoaders.babel.options.plugins = [
    //   '@babel/plugin-proposal-class-properties',
    //   '@babel/plugin-proposal-object-rest-spread',
    //   '@babel/plugin-syntax-dynamic-import',
    //   'babel-plugin-transform-react-remove-prop-types',
    //   'babel-plugin-transform-flow-strip-types',
    // ];

    config.module.rules.push(
      // Correctly generate source maps for @haaretz packages
      // the app depends on
      {
        test: /\.(mjs|jsx|js)$/,
        use: [ 'source-map-loader', ],
        enforce: 'pre',
        // Only get source maps from haaretz packages
        exclude: /node_modules(?!@haaretz)/,
        type: 'javascript/auto',
      },
      // Fix compilation issue when building from ESM
      // see https://github.com/graphql/graphql-js/issues/1272
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      }
    );

    if (!config.resolve) config.resolve = {};

    // see https://github.com/graphql/graphql-js/issues/1272
    // Fix compilation issue when building from ESM
    config.resolve.extensions = [ '.webpack.js', '.web.js', '.mjs', '.js', '.jsx', '.json', ];

    // Use source files by default in htz packages
    // config.resolve.mainFiles = [ 'htzInternal', 'esnext', 'module', 'main', ];
    // config.resolve.mainFiles = [ 'esnext', 'module', 'main', ];
    // config.resolve.mainFiles = [ 'module', 'main', ];

    if (!config.resolve.alias) config.resolve.alias = {};

    // These shims are needed for bunyan (logging)
    config.resolve.alias.config$ = require.resolve('@haaretz/htz-react-base/webpack/configShim');
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
  // })
};
module.exports = process.env.NODE_ENV === 'development' ? withSourceMaps(config): withSourceMaps(withTranspiledModules(config));
