/* @flow */

import getLengthProps from '../units/getLengthProps';
import { DEFAULT_BROWSER_FONT_SIZE, } from '../consts/index';
import type { BpsConfig, MqOptions, WidthBpsConfig, } from './createMqFunc';

/**
 * Get a media-query string from a query against
 * pre-defined named breakpoints
 *
 *
 * @param {BpsConfig} breakpoints <br />
 *   A configuration object containing settings for named breakpoints
 *   and their values
 * @param {WidthBpsConfig} [breakpoints.widths]
 *   An object containing named width-breakpoints as keys,
 *   and a number representing their width in pixels as values.
 *   Used when evaluating the `from` and `until`
 *   arguments of a query.
 * @param {MiscBpsConfig} [breakpoints.misc]
 *   An object containing named breakpoints of commonly used
 *   miscellaneous media-query features as keys, and their
 *   associated query features as values.
 *
 * @param {MqOptions} query
 *   The options for building the media-query string
 * @param {string|number} [query.from]
 *   The `min-width` argument (inclusive).<br />
 *   A `string` should be the name of a named breakpoint while
 *   a `number` will be interpreted as a value in pixels
 *   (and converted to ems).
 * @param {string|number} [query.until]
 *   The `max-width` argument (exclusive).<br />
 *   A `string` should be the name of a named breakpoint while
 *   a `number` will be interpreted as a value in pixels
 *   (and converted to ems).
 * @param {string} [query.misc]
 *   Miscellaneous media feature queries.
 *   Either a named breakpoint, or a feature string,
 *   e.g., `(orientation: landscape)`.
 * @param {string} [query.type]
 *   A media type, e.g., `only screen`, `print`, etc.
 * @param {true} [noCssMedia]
 *   Omit the `@media` prefix from the returned string.
 *   Useful for usage in `matchMedia`
 *
 * @return {string} a media-query string
 *
 * @exmaple
 * getMqString(
 *   {
 *     widths: { s: 400, m: 600, l: 1000, },
 *     misc: { landscape: 'orientation: landscape', },
 *   },
 *   { from: 's', until: 'l', type: 'screen' }
 * ); // => '@media screen and (min-width: 25em) and (max-width: 999)'
 *
 * getMqString(
 *   {
 *     widths: { s: 400, m: 600, l: 1000, },
 *     misc: { landscape: 'orientation: landscape', },
 *   },
 *   { from: 's', until: 'l', type: 'screen' },
 *   true
 * ); // => 'screen and (min-width: 25em) and (max-width: 999)'
 */
export default function getMqString(
  { widths, misc: miscBps, }: BpsConfig,
  { from, until, misc, type, }: MqOptions,
  noCssMedia?: true
): string {
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
      widths,
      true
    )})`
    : '';
  const namedMisc = miscBps[misc || ''];
  const miscOption = namedMisc || misc || '';
  const miscString = (typeString || minString || maxString) && misc
    ? ` and ${miscOption}`
    : miscOption;

  const mediaString = typeString + minString + maxString + miscString;

  return noCssMedia ? mediaString : `@media ${mediaString}`;
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
 * @param {string|number} length
 *   A named breakpoint, a length-string or a number
 *   representing pixel values (will be converted to ems)
 * @param {WidthBpsConfig} breakpoints
 *   A `{ name: number }` object with keys for named length
 *   breakpoints and values representing lengths in pixels
 * @param {true} [isUntil]
 *   Indicates that the length being calculated is for an
 *   `until` query, and should be exclusive.
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
  breakpoints: WidthBpsConfig,
  isUntil?: true
): string {
  // if `length` is a number, assume it is in pixels and convert to em
  if (typeof length === 'number') {
    return `${(length - (isUntil ? 1 : 0)) / DEFAULT_BROWSER_FONT_SIZE}em`;
  }
  const lengthNumber = breakpoints[length] ? breakpoints[length] : undefined;
  if (lengthNumber) return getLengthString(lengthNumber, breakpoints, isUntil);
  const { unitlessValue, unit, } = getLengthProps(length);
  return unit === 'px'
    ? getLengthString(unitlessValue, breakpoints, isUntil)
    : length;
}
