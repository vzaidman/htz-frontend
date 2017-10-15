/* @flow */
/**
 * Get a range of breakpoints between two points in a list.
 *
 * @param bps - an array containing all breakpoint names.
 * @param {string} [min] - The beginning of the range.
 * @param {string} [max] - The end of the range.
 *
 * @return An array containing all breakpoints within the range (inclusive).
 *
 * @private
 *
 * @example
 * const bps = ['s', 'm', 'l', 'xl'];
 * getBpsInRange(bps, 'm', 'xl') // => ['m', 'l', 'xl']
 *
 */
export default function getBpsInRange(
  bps: string[],
  min?: string,
  max?: string
): string[] {
  if (bps.length === 0) {
    throw new Error('The "bps" array in "getBpsInRange" can not be empty');
  }
  // if (min === undefined && max === undefined) {
  //   throw new Error(`At least one of the "min" and "max" parameters mast be defined in "getBpsInRange"`);
  // }
  const start = min ? bps.indexOf(min) : 0;
  const end = max ? bps.indexOf(max) : bps.length - 1;
  if (min && start === -1) {
    throw new Error(
      `"${min}" does not exist in the array of breakpoint names passed to "getBpsInRange"`
    );
  }
  if (max && end === -1) {
    throw new Error(
      `"${max}" does not exist in the array of breakpoint names passed to "getBpsInRange"`
    );
  }
  if (min && max && start > end) {
    throw new Error(
      `"min" (${min}) must be a smaller than or the same breakpoint as "max" (${max}), in "getBpsInRange"`
    );
  }
  return start === end ? [ bps[start], ] : bps.slice(start, end + 1);
}
