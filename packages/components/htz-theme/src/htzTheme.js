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
import layoutStyle from './consts/layoutStyle';
import { benderStyle, } from './consts/listStyle';
import cardStyle from './consts/cardStyle';
import newsletterStyle from './consts/newsletterStyle';
import selectStyle from './consts/selectStyle';
import specialPromotionStyle from './consts/specialPromotionStyle';
import typeConf from './consts/typeConf';
import {
  a11yMenuI18n,
  alertsI18n,
  articleLayoutI18n,
  breadcrumbsI18n,
  clickTrackerI18n,
  commentI18n,
  commentFormI18n,
  commentSentI18n,
  commentsSectionI18n,
  creditPrefixI18n,
  footerDesktopI18n,
  footerMobileListsI18n,
  fryListI18n,
  galleryI18n,
  headerSearchI18n,
  mobileAdditionalShare,
  mobileNavigationMenuI18n,
  mobileQuickRegistrationI18n,
  mobileReadingList,
  mobileSearchI18n,
  mobileUserMenuI18n,
  navigationMenuI18n,
  newsletterI18n,
  osakaI18n,
  readingListMenuI18n,
  recipeIngredientsI18n,
  recipeInstructionsI18n,
  recipeRatingI18n,
  reviewRatingI18n,
  seriesArticleI18n,
  serviceByMailI18n,
  tagsElementI18n,
  textInputI18n,
  userMenuI18n,
  welcomePageI18n,
  zenTextI18n,
  zoominText,
  zoomoutText,
  selectAriaLabel,
} from './consts/i18n';

// methods
import getColor from './methods/getColor';
import getDelay from './methods/getDelay';
import getDuration from './methods/getDuration';
import getTimingFunction from './methods/getTimingFunction';
import getTransition from './methods/getTransition';
import getTransitionString from './methods/getTransitionString';
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
  layoutStyle,
  cardStyle,
  newsletterStyle,
  selectStyle,
  specialPromotionStyle,
  typeConf,

  // I18n
  a11yMenuI18n,
  alertsI18n,
  articleLayoutI18n,
  breadcrumbsI18n,
  clickTrackerI18n,
  commentI18n,
  commentFormI18n,
  commentSentI18n,
  commentsSectionI18n,
  creditPrefixI18n,
  footerDesktopI18n,
  footerMobileListsI18n,
  fryListI18n,
  galleryI18n,
  headerSearchI18n,
  mobileAdditionalShare,
  mobileNavigationMenuI18n,
  mobileQuickRegistrationI18n,
  mobileReadingList,
  mobileSearchI18n,
  mobileUserMenuI18n,
  navigationMenuI18n,
  newsletterI18n,
  osakaI18n,
  readingListMenuI18n,
  recipeIngredientsI18n,
  recipeInstructionsI18n,
  reviewRatingI18n,
  recipeRatingI18n,
  seriesArticleI18n,
  serviceByMailI18n,
  tagsElementI18n,
  textInputI18n,
  userMenuI18n,
  welcomePageI18n,
  zenTextI18n,
  zoominText,
  zoomoutText,
  selectAriaLabel,
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
