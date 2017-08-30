import { createRenderer, } from 'fela';
import webPreset from 'fela-preset-web';
import validator from 'fela-plugin-validator';

const plugins = [ ...webPreset, ];

if (process.env.NODE_ENV !== 'production') {
  plugins.push(validator());
}

/**
 * The Fela renderer used to create styles.
 */
export default createRenderer({ plugins, });
