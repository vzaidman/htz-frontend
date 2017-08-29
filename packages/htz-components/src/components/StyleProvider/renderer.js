import { createRenderer } from 'fela'
import webPreset from 'fela-preset-web'

const plugins = [...webPreset]

if (process.env.NODE_ENV !== 'production') {
  plugins.push(require('fela-plugin-validator').default())
}

/**
 * The Fela renderer used to create styles.
 */
export default createRenderer({ plugins })
