/* @flow */

/**
 * Test if a string or list of string is\are a named breakpoint
 *
 * @param {string|string[]} breakpoint - The breakpoint name(s) to validate.
 * @param {string[]} namedBps - A list of named breakpoints
 * @param {true} [shouldThrow] - Throw an error if the tested breakpoint(s) is not
 *   a valid named breakpoint
 *
 * @throws {Error} - `"${breakpoint}" is not a named breakpoint`
 * @private
 *
 * @example
 * isNamedBp('small', ['small', 'large']) // => true
 * isNamedBp(['small', 'huge'], ['small', 'large', 'huge']) // => true
 * isNamedBp('mobile', ['small', 'large']) // => false
 * isNamedBp(['small', 'desktop'], ['small', 'large']) // => false
 * isNamedBp('mobile', ['small', 'large'], true) // Throws: "mobile" is not a named breakpoint
 */
export default function isNamedBp(
  breakpoint: string | string[],
  namedBps: string[],
  shouldThrow?: true
): boolean {
  const bps = Array.isArray(breakpoint) ? breakpoint : [ breakpoint, ];

  const invalidBps = bps.filter(bp => namedBps.indexOf(bp) === -1);
  const hasInvalidBps = invalidBps.length > 0;

  if (hasInvalidBps && shouldThrow) {
    throw new Error(`"${invalidBps[0]}" is not a named breakpoint`);
  }

  return !hasInvalidBps;
}
