// consts
import articleStyle from './consts/articleStyle';
import bps from './consts/bps';
import btnStyle from './consts/btnStyle';
import captionStyles from './consts/captionStyles';
import cssReset from './consts/cssReset';
import fontStacks from './consts/fontStacks';
import gridStyle from './consts/gridStyle';
import inputStyle from './consts/inputStyle';
import typeConf from './consts/typeConf';
import internationalization from './consts/internationalization';
import i18n from './consts/i18n';

// methods
import getColor from './methods/getColor';
import {
  getDelay,
  getDuration,
  getTimingFunction,
  getTransition,
} from './methods/animation';
import pxToRem from './methods/pxToRem';
import typesetter from './methods/typesetter';
import mq from './methods/mq';

export { cssReset, };

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
 * @prop {Object} btnStyle - An immutable Object with button style definitions
 * @prop {number} btnStyle.borderWidth  - The width of a button's outline, in pixels
 * @prop {string} btnStyle.borderStyle  - The `border-style` of a button's outline
 * @prop {number} btnStyle.radius  - A button's `border-radius`, in pixels.
 * @prop {'rtl'} direction - The application's flow direction
 * @prop {Object} gridStyle - An object containing grid related style definitions.
 * @prop {number} gridStyle.gutterWidth - The default width of the gutter between grid items.
 * @prop {number} gridStyle.ruleWidth - The default width of a vertical rule separating
 *   two grid items.
 * @prop {string[]} gridStyle.ruleWidth - The default color of a vertical rule separating
 *   two grid items.
 * @prop {Object} fontStacks - An object containing font-family stacks for different use cases
 * @prop {Object} inputStyle - An immutable Object with input style definitions
 * @prop {number} inputStyle.borderWidth  - The width of an input's outline, in pixels
 * @prop {string} inputStyle.borderStyle  - The `border-style` of an input's outline
 * @prop {number} inputStyle.radius  - An input's `border-radius`, in pixels.
 * @prop {Object} typeConf - An immutable
 *   [TypeConf](https://haaretz.github.io/htz-frontend/htz-css-tools#typeconf) object per-breakpoint
 *   typographic and vertical-rhythm values
 * @prop {function} color - A [colorGetter](https://haaretz.github.io/htz-frontend/htz-css-tools#colorgetter)
 *   function for retrieving color values from the predefined color palette.
 * @prop {function} getTransition - A function taking `duration` (`number`), `easing` (`string`)
 *   and `delay` (`number`) arguments. `duration` and `delay` steps start with `0`, which equals to `.25s`,
 *   continue with `1`, which equals `.3s` and continue upwards, with every step equaling `step * 0.25s`.
 * @prop {function} getDuration - A function taking `type` and `duration` arguments.
 *   `type` indicates if the duration is applied to an `animation` or a `transition`.
 *   `duration` is a duration step where `0` is `.25s`, `1` is `.3s` and every step up is `step * 0.25s`.
 * @prop {function} getDelay - A function taking `type` and `delay` arguments.
 *   `type` indicates if the delay is applied to an `animation` or a `transition`.
 *   `delay` is a delay step where `0` is `.25s`, `1` is `.3s` and every step up is `step * 0.25s`.
 * @prop {function} getTimingFunction - A function taking a `type` argument, indicating the effect
 *   to which the timing function is applied to (`animation`|`transition`) and an `easing` (`string`)
 *   argument, referring to a named timing-function describing how the intermediate values of the CSS
 *   properties being affected by an animation or transition effect are calculated.
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
  // Constants
  articleStyle,
  bps,
  btnStyle,
  captionStyles,
  direrction: 'rtl',
  gridStyle,
  fontStacks,
  inputStyle,
  typeConf,

  // Methods
  color: getColor,
  getDelay,
  getDuration,
  getTimingFunction,
  getTransition,
  mq,
  pxToRem,
  type: typesetter,
});

export default htzTheme;
export { bps, getColor, getTransition, mq, pxToRem, typesetter, internationalization, i18n, };
