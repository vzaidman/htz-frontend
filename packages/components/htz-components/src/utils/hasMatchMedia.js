/* @flow */
/* globals window */

/**
 * Test if the `window` object is available has the `matchMedia` method
 *
 * @return {boolean}
 */
export default function hasMatchMedia(): boolean {
  return (
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
  );
}
