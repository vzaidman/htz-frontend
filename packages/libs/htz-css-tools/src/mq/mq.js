/* @flow */
import getLengthProps from '../units/getLengthProps';
import getMqString from './getMqString';
import { DEFAULT_BROWSER_FONT_SIZE, } from '../consts/index';

// //////////////////// //
//   Type Definitions   //
// //////////////////// //
/**
 * Named width breakpoints.<br />
 * An object containing named width-breakpoints as keys, and a number representing
 * their width in pixels as values. Used when evaluating the `from` and `until`
 * arguments in media query functions.<br />
 * May not contain a `default` property (it is used internally by the framework)
 *
 * @example
 * {
 *   's': 320,
 *   'm': 780,
 *   'l': 1024,
 * }
 */
export type WidthBpsConfig = {
  [bpName: string]: number
};

/**
 * Misc media features config objects.<br />
 * Contains named breakpoints of commonly used miscellaneous
 * media-query features as keys, and their associated query features
 * as values.
 *
 * @example
 * {
 *   landscape: '(orientation: landscape)'
 * }
 */
export type MiscBpsConfig = {
  [bpName: string]: string
};

/**
 * A configuration object holding named breakpoints and their values
 * @property {MiscBpsConfig} widths <br />
 *   An object containing named width-breakpoints as keys, and a number representing
 *   their width in pixels as values. Used when evaluating the `from` and `until`
 *   arguments in media query functions.<br />
 *   May not contain a `default` property (it is used internally by the framework)
 * @property {MiscBpsConfig} misc <br />
 *   An object containing named breakpoints of commonly used miscellaneous
 *   media-query features as keys, and their associated query features as values.
 */
export type BpsConfig = {|
  widths: WidthBpsConfig,
  misc: MiscBpsConfig
|};

/**
 * An options object for the media query function
 *
 * @prop {string|number} [from]
 *   The `min-width` argument (inclusive).<br />
 *   A 'number' will be interpreted as a value in pixels (and converted to ems).
 *   Strings can either be a named breakpoint or number-strings in css length
 *   units, which will not be converted.
 * @prop {string|number} [until]
 *   The `max-width` argument (exclusive).<br />
 *   A 'number' will be interpreted as a value in pixels (and converted to ems).
 *   Strings can either be a named breakpoint or number-strings in css length
 *   units, which will not be converted.
 * @prop {string} [misc]
 *   Miscellaneous media feature queries. Either a named breakpoint, or a feature
 *   string, e.g., `(orientation: landscape)`.
 * @prop {string} [type]
 *   The media type, e.g., `only screen`, `print`, etc.
 */
export type MqOptions = {|
  from?: string | number,
  until?: string | number,
  misc?: string | void,
  type?: string | void
|};

/**
 * A function that intelligently returns a media-query scoped css-in-js object
 *
 * @param {MqOptions} mqOptions
 * @param {string|number} [mqOptions.from] The `min-width` argument (inclusive).<br />
 *   A `number` will be interpreted as a value in pixels (and converted to ems).<br />
 *   `string`s can either be a named breakpoint or number-strings in css length units,
 *   which Will not be converted.
 * @param {string|number} [mqOptions.until] The `max-width` argument (exclusive).<br />
 *   A 'number' will be interpreted as a value in pixels (and converted to ems).<br />
 *   Strings can either be a named breakpoint or number-strings in css length units,
 *   which Will not be converted.
 * @param {string} [mqOptions.misc] Miscellaneous media feature queries. Either a named breakpoint,
 *   or a feature string, e.g., `(orientation: landscape)`.
 * @param {string} [mqOptions.type] A media type, e.g., `only screen`, `print`, etc.
 * @param {Object} styles A css-in-js style object
 *
 * @return {Object} A media-query scoped css-in-js object
 *
 * @example
 * const mq = createMqFunc();
 *
 * // Styles as object
 * const style = {
 *   ...mq({from: 's', until: 'l'}, { color: 'red', }),
 * }
 *
 * // Output
 * const style = {
 *   '@media (min-width: 37.5em) and (max-width: 64em)': {
 *     color: 'red',
 *   }
 * }
 */
export type MqFunc = (MqOptions, styles: Object) => Object;

// //////// //
//   Core   //
// //////// //
const defaultBps: BpsConfig = {
  widths: {
    s: 600,
    m: 768,
    l: 1024,
    xl: 1280,
  },
  misc: {
    landscape: '(orientation: landscape)',
    partrait: '(orientation: portrait)',
    hidpi: '(min-resolution: 1.5dppx)',
  },
};

/**
 * Return a config-based media-query function.
 *
 * @param {BpsConfig} [breakpoints] <br />
 *   A configuration object containing settings for named breakpoints and their values
 * @param {WidthBpsConfig} [breakpoints.widths={
 *     s: 600,
 *     m: 768,
 *     l: 1024,
 *     xl: 1280,
 *   }]
 *   An object containing named width-breakpoints as keys, and a number representing
 *   their width in pixels as values. Used when evaluating the `from` and `until`
 *   arguments in media query functions.
 * @param {MiscBpsConfig} [breakpoints.misc={
 *     landscape: '(orientation: landscape)',
 *     partrait: '(orientation: portrait)',
 *     hidpi: '(min-resolution: 1.5dppx)',
 *   }]
 *   An object containing named breakpoints of commonly used miscellaneous
 *   media-query features as keys, and their associated query features as values.
 *
 * @returns - A function that generates media-query strings based
 *   on the `breakpoints` config object.
 */
export default function createMqFunc(
  breakpoints: BpsConfig = defaultBps
): MqFunc {
  if (!breakpoints.widths) {
    throw new Error('The configuration object must contain a `widths` key');
  }
  if (breakpoints.widths.default !== undefined) {
    throw new Error(
      'The "default" width breakpoint is reserved for internal use by Panache'
    );
  }
  if (!breakpoints.misc) {
    throw new Error('The configuration object must contain a `misc` key');
  }

  return function mqFunc(
    { from, until, misc = '', type = '', }: MqOptions = {},
    styles: Object
  ): Object {
    if (!from && !until && !misc && !type) {
      return styles;
    }

    const mqString = getMqString(breakpoints, { from, until, misc, type, });
    return { [mqString]: styles, };
  };
}
