import getColor from './colors';
import typesetter from './typesetter';
import mq, { bps, } from './mq';

/**
 * Haaretz theme component
 *
 */
const htzTheme = Object.freeze({
  bps,
  color: getColor,
  direrction: 'rtl',
  mq,
  type: typesetter,
});

export default htzTheme;
