// consts
import bps from './consts/bps';
import fontStacks from './consts/fontStacks';
import getColor from './methods/getColor';
import typeConf from './consts/typeConf';
import typographicBaseline from './consts/typographicBaseline';

// methods
import typesetter from './methods/typesetter';
import pxToRem from './methods/pxToRem';
import mq from './methods/mq';

/**
 * Haaretz theme component
 *
 * @prop {Object} bps - An immutable [mqoptions](https://haaretz.github.io/htz-frontend/htz-css-tools#mqoptions)
 *   object with breakpoint definitions
 * @prop {Object} bps.width - An immutable
 *   [WidthBpsConfig](https://haaretz.github.io/htz-frontend/htz-css-tools#widthbpsconfig) object with
 *   values of boundary points between named width-breakpoints
 * @prop {Object} bps.misc - An immutable
 *   [MiscBpsConfig](https://haaretz.github.io/htz-frontend/htz-css-tools#miscbpsconfig) object with
 *   values named miscellaneous media-features media queries
 * @prop {'rtl'} direction - The application's flow direction
 * @prop {Object} fontStacks - An object containing font-family stacks for different use cases
 * @prop {Object} typeConf - An immutable
 *   [TypeConf](https://haaretz.github.io/htz-frontend/htz-css-tools#typeconf) object per-breakpoint
 *   typographic and vertical-rhythm values
 * @prop {string} typographicBaseline - a css-like string for setting the typographic baseline on
 *   the `html` and `body` elements.
 * @prop {function} color - A [colorGetter](https://haaretz.github.io/htz-frontend/htz-css-tools#colorgetter)
 *   function for retrieving color values from the predefined color palette.
 * @prop {function} mq - A [media-query function](https://haaretz.github.io/htz-frontend/htz-css-tools#typeconf),
 *   which intelligently returns a media-query scoped css-in-js object based on breakpoints defined
 *   in `theme.bps`
 * @prop {function} pxToRem - A function that
 *   [converts px values to rem](https://haaretz.github.io/htz-frontend/htz-css-tools#remfunctiontype)
 *   at given breakpoints while accounting to changes in vertical rhythm
 * @prop {function} type - A [Typesetter](https://haaretz.github.io/htz-frontend/htz-css-tools#typesetter)
 *   function that returns a CSS-in-JS object of typographic styles conforming to a global predefined
 *   typographic scale and vertical rhythm
 */
const htzTheme = Object.freeze({
  // Objects
  bps,
  direrction: 'rtl',
  fontStacks,
  typeConf,
  typographicBaseline,

  // Methods
  color: getColor,
  mq,
  pxToRem,
  type: typesetter,
});

export default htzTheme;
