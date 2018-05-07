// consts
import baseColors from './consts/baseColors';
import bps from './consts/bps';
import cssReset from './consts/cssReset';
import fontStacks from './consts/fontStacks';
import i18n from './consts/i18n';

// methods
import getColor from './methods/getColor';
import mq from './methods/mq';
import pxToRem from './methods/pxToRem';
import typesetter from './methods/typesetter';
<<<<<<< HEAD
=======
import mq from './methods/mq';

export { cssReset, };

/**
 * Haaretz theme object
 */
const htzTheme = Object.freeze({
  // Constants
  articleStyle,
  bps,
  btnStyle,
  captionStyles,
  commentsStyle,
  direction: 'rtl',
  gridStyle,
  fontStacks,
  footerBorderStyle,
  inputStyle,
  newsletterStyle,
  specialPromotionStyle,
  selectStyle,
  typeConf,
>>>>>>> fix(rebase-master): update branch and rebase master 7/5/18

import htzTheme from './htzTheme';

export default htzTheme;
export {
  htzTheme,
  cssReset,
  baseColors,
  bps,
  fontStacks,
  getColor,
  mq,
  pxToRem,
  typesetter,
  i18n,
};
