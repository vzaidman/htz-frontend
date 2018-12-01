import { createRenderer as createFelaRenderer, } from 'fela';

// Fela plugins
import bidiTransformer from 'bidi-css-js';
import embedded from 'fela-plugin-embedded';
import extend from 'fela-plugin-extend';
import fallbackValue from 'fela-plugin-fallback-value';
import lvha from 'fela-plugin-lvha';
import { prefix, } from 'inline-style-prefixer';
import placeholderPrefixer from 'fela-plugin-placeholder-prefixer';
import unit from 'fela-plugin-unit';
// Plugins used only during development
import validator from 'fela-plugin-validator';

// Fela enhancers
import combineArrays from 'fela-combine-arrays';
// Enhancers used only during development:
import beautifier from 'fela-beautifier';
// import perf from 'fela-perf';
// import statistics from 'fela-statistics';

const prefixer = () => style => prefix(style);
const bidi = flowDirection => style => bidiTransformer(style, flowDirection);
const isDevEnv = process.env.NODE_ENV !== 'production';

/**
 * A factory for creating a custom Fela renderer,
 * tailored to an app's needs
 *
 * @param {object} [options] an options object.
 * @param {boolean} [options.isDev=process.env.NODE_ENV !== 'production']
 *   Manually override the node environment settings.
 *   Can be useful, e.g., for testing. Set according to `NODE_ENV` by default
 * @param {boolean} [options.isRtl] Set the renderer to handle RTL layouts
 * @param {boolean} [options.selectorPrefix='htz-'] A string to namespace all class names with
 *
 * @return {function} A fela `createRenderer` function
 */
export default function createRenderer({
  isDev = isDevEnv,
  isRtl,
  selectorPrefix = isDevEnv ? 'htz-' : '',
} = {}) {
  const plugins = [
    // Allows extending instead of overwriting style objects
    extend(),
    // Hendles @font-face and @keyframes
    embedded(),
    // Sort pseudo-classes in a predictable order
    lvha(),
    // Treat number primitives as a specific css unit
    unit('rem', {
      border: 'px',
      borderBottom: 'px',
      borderLeft: 'px',
      borderRight: 'px',
      borderTop: 'px',
      opacity: '',
      zIndex: '',
    }),
    placeholderPrefixer(),
    prefixer(),
    // Allows providing fallback values as an array.
    fallbackValue(),
    bidi(isRtl ? 'rtl' : 'ltr'),
  ];
  const enhancers = [ combineArrays([ 'extend', ]), ];

  if (isDev) {
    plugins.push(validator());
    enhancers.push(beautifier({ autosemicolon: true, }));
  }
  else {
    // prod-only plugins
  }

  return createFelaRenderer({
    plugins,
    enhancers,
    selectorPrefix,
  });
}
