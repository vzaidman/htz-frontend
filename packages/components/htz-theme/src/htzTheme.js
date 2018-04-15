// consts
import articleStyle from './consts/articleStyle';
import bps from './consts/bps';
import btnStyle from './consts/btnStyle';
import captionStyles from './consts/captionStyles';
import commentsStyle from './consts/commentsStyle';
import fontStacks from './consts/fontStacks';
import footerBorderStyle from './consts/footerBorderStyle';
import gridStyle from './consts/gridStyle';
import inputStyle from './consts/inputStyle';
import { benderStyle, } from './consts/listStyle';
import newsletterStyle from './consts/newsletterStyle';
import selectStyle from './consts/selectStyle';
import typeConf from './consts/typeConf';
import {
  breadcrumbsI18n,
  commentI18n,
  commentFormI18n,
  commentSentI18n,
  commentsSectionI18n,
  footerDesktopI18n,
  footerMobileListsI18n,
  fryListI18n,
  navigationI18n,
  navigationSearchI18n,
  newsletterI18n,
  osakaI18n,
  seriesArticleI18n,
  tagsElementI18n,
  textInputI18n,
  welcomePageI18n,
  zoominText,
  zoomoutText,
} from './consts/i18n';

// methods
import getColor from './methods/getColor';
import {
  getDelay,
  getDuration,
  getTimingFunction,
  getTransition,
  getTransitionString,
} from './methods/animation';
import getMqString from './methods/getMqString';
import getZIndex from './methods/getZIndex';
import pxToRem from './methods/pxToRem';
import typesetter from './methods/typesetter';
import mq from './methods/mq';

/**
 * Haaretz theme object
 */
const htzTheme = Object.freeze({
  // Constants
  articleStyle,
  benderStyle,
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
  selectStyle,
  typeConf,

  // I18n
  breadcrumbsI18n,
  commentI18n,
  commentFormI18n,
  commentSentI18n,
  commentsSectionI18n,
  footerDesktopI18n,
  footerMobileListsI18n,
  fryListI18n,
  navigationI18n,
  navigationSearchI18n,
  newsletterI18n,
  osakaI18n,
  seriesArticleI18n,
  tagsElementI18n,
  textInputI18n,
  welcomePageI18n,
  zoominText,
  zoomoutText,

  // Methods
  color: getColor,
  getDelay,
  getDuration,
  getTimingFunction,
  getTransition,
  getTransitionString,
  getMqString,
  getZIndex,
  mq,
  pxToRem,
  type: typesetter,
});

export default htzTheme;
