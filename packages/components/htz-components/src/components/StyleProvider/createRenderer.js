import { createRenderer as createFelaRenderer, } from 'fela';

// Fela plugins
import customProperty from 'fela-plugin-custom-property';
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
    customProperty({
      // Will be used for RTL<->LTR normalizations.
      // `flexbox` really did it right when it comes to normalizing
      // directionality, and I'd like to be able to use properties like
      // `paddingStart` and `paddingEnd`, and having them automatically
      // mapped by Fela according to the correct direction contenxt.
      // Rather than having to handle this in each component, I'd rather
      // handle it once here in the renderer.
      // TODO: remove dummy `size` Property.
      size: size => ({
        height: size,
        width: size,
      }),
    }),
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
    }),
    // Allows extending instead of overwriting style objects
    extend(),
    // Allows providing fallback values as an array.
    // Must be last to be included
    fallbackValue(),
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
