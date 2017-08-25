import { createRenderer } from 'fela'
import webPreset from 'fela-preset-web'

/**
 * The Fela renderer used to create styles.
 */
export default createRenderer({
  plugins: [...webPreset]
})
