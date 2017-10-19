import { createRenderer as createFelaRenderer, } from 'fela';

// Fela plugins
import bidi from 'fela-plugin-bidi';
import embedded from 'fela-plugin-embedded';
import extend from 'fela-plugin-extend';
import fallbackValue from 'fela-plugin-fallback-value';
import lvha from 'fela-plugin-lvha';
import prefixer from 'fela-plugin-prefixer';
import placeholderPrefixer from 'fela-plugin-placeholder-prefixer';
import unit from 'fela-plugin-unit';
import removeUndefined from 'fela-plugin-remove-undefined'; // Only used in prod
import validator from 'fela-plugin-validator'; // Only used in dev

// Fela enhancers (only used in dev)
import beautifier from 'fela-beautifier';
import perf from 'fela-perf';
import statistics from 'fela-statistics';

/**
 * A function to create a custom Fela renderer,
 * tailored to an app's needs
 *
 * @param {object} [options] an options object.
 * @param {boolean} [options.isDev=process.env.NODE_ENV !== 'production']
 *   Manually override the node environment settings.
 *   Can be useful, e.g., for testing.
 * @param {boolean} [options.isRtl] Set the renderer to handle RTL layouts
 * @param {boolean} [options.selectorPrefix='htz-'] Set the renderer to handle RTL layouts
 *
 * @return {function} A fela `createRenderer` function
 */
export default function createRenderer(
  {
    isDev = process.env.NODE_ENV !== 'production',
    isRtl,
    selectorPrefix = 'htz-',
  } = {}
) {
  const plugins = [
    extend(),
    embedded(),
    // Sort pseudo-classes in a predictable order
    lvha(),
    // Auto-prefix properties and values
    placeholderPrefixer(),
    prefixer(),
    // Treat number primitives as a specific css unit
    unit('rem', {
      border: 'px',
      borderBottom: 'px',
      borderLeft: 'px',
      borderRight: 'px',
      borderTop: 'px',
      opacity: '',
    }),
    // Allows extending instead of overwriting style objects
    // Allows providing fallback values as an array.
    // Must be last to be included
    fallbackValue(),
    bidi('rtl'),
  ];
  const enhancers = [];

  if (isDev) {
    plugins.push(validator());
    enhancers.push(beautifier({ autosemicolon: true, }), perf(), statistics());
  }
  else {
    plugins.push(removeUndefined());
  }

  return createFelaRenderer({
    plugins,
    enhancers,
    selectorPrefix,
  });
}
