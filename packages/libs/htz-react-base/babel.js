/**
 * Default Babel config for Haaretz component modules, which should have a
 * `.babelrc` file at their root like:
 *
 *   { "presets": ["@haaretz/htz-react-base/babel.js"] }
 *
 * The different environment configs are not organized using the `env` option
 * because (1) it's supposed to be deprecated in Babel 7 in favor of this
 * approach and (2) it wasn't working correctly anyway.
 */

// These are always applied, because they are outside the scope of
// `babel-preset-env` until such transforms are official.
const presets = [ 'react', 'flow', ];
const plugins = [ 'transform-object-rest-spread', 'transform-class-properties', ];
const ignore = [];

switch (process.env.BABEL_ENV) {
  // The `commonjs` environment is used to generate `/dist/lib` and will be
  // used for traditional Node imports, including during server side rendering
  // (SSR). It should target the minimum supported Node.js version.
  case 'commonjs':
    presets.push([
      'env',
      {
        targets: {
          node: '8',
        },
      },
    ]);
    break;
  // The `esm` environment is used to generate `/dist/esm` and will be used
  // by bundlers like webpack 2+ with no extra configuration necessary.
  case 'esm':
    presets.push([
      'env',
      {
        targets: {
          // The browser list having any slimming effect on the selected
          // transforms is mostly aspirational due to the UglifyJS requirement,
          // see below.
          browsers: require('./browsers'),
          // This line is necessary as long as webpack uses UglifyJS for
          // for minification. Certain syntax transforms are necessary even if
          // every browser in the list supports it, because UglifyJS needs to
          // support it too. You may notice that removing this line may not
          // break the build - most likely, that just means the selected
          // browsers happen to require the same transforms.
          uglify: true,
        },
        modules: false,
      },
    ]);
    break;
  // The `esnext` environment is used to generate `/dist/esnext` and will be
  // used by advanced webpack setups that are specifically configured to
  // handle syntax with as few transforms pre-applied as possible. Additional
  // transpilation will be necessary (via `babel-loader`), but consuming apps
  // can decide what to do for themselves.
  // TODO: Consider concatenating to single file using rollup, for better tree shaking by consumers (reexports are't well tree-shaken yet)
  case 'esnext':
  default:
    break;
}

switch (process.env.NODE_ENV) {
  case 'test':
    break;
  default:
    ignore.push('**/*.{spec,test}.{js,jsx}');
}

module.exports = {
  presets,
  plugins,
  ignore,
};
