/* @flow */

/**
 * A POJO structured like a CSS declaration block<br />
 * **keys:** Strings representing either css properties or selectors (or @rules)
  for nesting.<br />
 * **Values:** [StyleValue](#stylevalue)
 *
 * @type {Object}
 */
// eslint-disable-next-line no-use-before-define
type CSSDecleration = { [prop: string]: StyleValue };

/**
 * A CSS value.
 *
 * May also contain a [`CSSDecleration`](#cssdecleration) for nesting or
 * an array of style values, for generating fallback arguments.
 */
type StyleValue = string | number | CSSDecleration | (string | number)[];

/**
 * A utility to format css declarations
 *
 * Meant to allow easy replacement of how declarations are handled,
 * to accommodate the various styles of different CSS-in-JS frameworks (POJO or
 * tagged template literals).
 *
 * @param prop
 *   The css property
 * @param value
 *   Value(s) for `prop`
 *
 * @return The formatted style
 */
// eslint-disable-next-line import/prefer-default-export
export function styleFormatter(
  prop: string,
  value: StyleValue
): CSSDecleration {
  return { [prop]: value, };
}
