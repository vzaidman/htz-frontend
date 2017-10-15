/* @flow */
import getLengthProps from '../units/getLengthProps';
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
  { widths, misc, }: BpsConfig = defaultBps
): MqFunc {
  if (!widths) {
    throw new Error('The configuration object must contain a `widths` key');
  }
  if (widths.default !== undefined) {
    throw new Error(
      'The "default" width breakpoint is reserved for internal use by Panache'
    );
  }
  if (!misc) {
    throw new Error('The configuration object must contain a `misc` key');
  }

  const miscBps = misc;

  return function mqFunc(
    // eslint-disable-next-line no-shadow
    { from, until, misc = '', type = '', }: MqOptions = {},
    styles: Object
  ): Object {
    if (!from && !until && !misc && !type) {
      return styles;
    }
    const typeString = !type || type.toLowerCase() === 'all' ? '' : type;
    const minString = from
      ? `${typeString ? ' and ' : ''}(min-width: ${getLengthString(
        from,
        widths
      )})`
      : '';
    const maxString = until
      ? `${typeString || minString ? ' and ' : ''}(max-width: ${getLengthString(
        until,
        widths
      )})`
      : '';
    const namedMisc = miscBps[misc];
    const miscOption = namedMisc || misc;
    const miscString =
      (typeString || minString || maxString) && misc
        ? ` and ${miscOption}`
        : miscOption;
    const mqString = `@media ${typeString +
      minString +
      maxString +
      miscString}`;
    return { [mqString]: styles, };
  };
}

// //////////////// //
//  Util Funcitons  //
// //////////////// //
/**
 * Media query length string getter
 *
 * A private function that tries to convert a breakpoint-name, a `number` or a `number-string`
 * from `px` to `em`. Returns the original value if conversion fails.
 *
 * @param {string|number} length - A named breakpoint, a length-string or
 *   a number representing pixel values (will be converted to ems)
 * @param {WidthBpsConfig} breakpoints - A `{ name: number }` object with keys for named length breakpoints
 * and values representing lengths in pixels
 *
 * @return {string} A CSS length-string for a media-query
 * @private
 *
 * @example
 * const bps = { 's': 600, 'l': 1024, };
 * const lengthString = getLengthString('l', bps);
 * console.log(lengthString) // -> logs `"60em"`
 */
export function getLengthString(
  length: string | number,
  breakpoints: WidthBpsConfig
): string {
  // if `length` is a number, assume it is in pixels and convert to em
  if (typeof length === 'number') {
    return `${length / DEFAULT_BROWSER_FONT_SIZE}em`;
  }
  const lengthNumber = breakpoints[length];
  if (lengthNumber) return getLengthString(lengthNumber, breakpoints);
  const { unitlessValue, unit, } = getLengthProps(length);
  return unit === 'px' ? getLengthString(unitlessValue, breakpoints) : length;
}
