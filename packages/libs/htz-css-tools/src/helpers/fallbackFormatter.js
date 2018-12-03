/* @flow */
/**
 * An object with a single item, providing multiple rules for a single
 * CSS property for fallback<br />
 * **key:** A `string` containing the css property to create fallback values for<br />
 * **value:** An array of strings and\or numbers, providing fallback values for the
 * css property. Will be included in order, so last item in the array overrides
 * previous items.
 *
 * @example
 * {
 *  fontSize: ['16px', '1rem'],
 * }
 */
type FallbackRule = {| [property: string]: (string | number)[] |};

/**
 * A utility to format css fallback values
 *
 * Meant to allow easy replacement of how fallback values are handled,
 * to accommodate the various styles of different CSS-in-JS frameworks.
 *
 * @param prop The css property
 * @param values An array of values, in fallback order (Same order as css fallbacks)
 *
 * @return An object containing `prop` as a key and `values` as the value.
 *
 * @private
 *
 * @example
 * fallbackFormatter('fontSize', ['16px', '1rem']) // => { fontSize: ['16px', '1rem'] }
 */
// eslint-disable-next-line import/prefer-default-export
export function fallbackFormatter(
  prop: string,
  values: (string | number)[]
): FallbackRule {
  return {
    [prop]: values,
  };
}
