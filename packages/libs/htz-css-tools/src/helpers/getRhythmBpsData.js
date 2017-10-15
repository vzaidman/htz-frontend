/* @flow */

import getBpsInRange from './getBpsInRange';
import getClosestBp from './getClosestBp';

/**
  * Data about a rhythm breakpoint
  * @property {string} [from] The breakpoint's min-width
  * @property {string} [until] The breakpoint's max-width
  * @property {string} rhythmBp The name of the relevant rhythm breakpoint.
  *
  * @private
  */
export type RhythmBpData = {|
  from?: string | void,
  until?: string | void,
  rhythmBp: string,
|}


/**
 * Get a list of rhythm breakpoints within a range, and pertinent data
 * @param {string[]} bps A list of all breakpoint names, in ascending order, by width.
 * @param {string[]} rhythmBps A list of all rhythm breakpoints, in ascending of
 *   their location in the `bps` array.
 * @param {string} [from] The min-width breakpoint.
 * @param {string} [until] The max-width breakpoint.
 *
 * @return A list of rhythm breakpoints within range, and pertinent data
 * @private
 *
 * @example
 * const bps = ['s', 'm', 'l', 'xl'];
 * const rhythmBps = ['default', 'xl'];
 * getRhythmBpsData(bps, rhythmBps, 'm')
 *
 * // Returns:
 * [
 *   { from: 'm', until: 'xl', rhythmBp: 'default', },
 *   { from: 'xl', until: undefined, rhythmBp: 'xl', },
 * ]
 */
export default function getRhythmBpsData(
  bps: string[], rhythmBps: string[], from?: string, until?: string
): RhythmBpData[] {
  if (bps.length === 0 || rhythmBps.length === 0) {
    throw new Error(
      bps.length === 0 ?
        'The "bps" array in "getRhythmBpsData" can not be empty' :
        'The "rhythmBps" array in "getRhythmBpsData" can not be empty'
    );
  }

  const fromIndex = from ? bps.indexOf(from) : -1;
  const untilIndex = until ? bps.indexOf(until) : -1;

  if (from && fromIndex === -1) {
    throw new Error(`"from" (${from}) must be a breakpoint defined in "bps" (${bps.toString()})`);
  }
  if (until && untilIndex === -1) {
    throw new Error(`"until" (${until}) must be a breakpoint defined in "bps" (${bps.toString()})`);
  }
  if (from && until && fromIndex > untilIndex) {
    throw new Error(
      `"from" (${from}) must be a smaller than or the same breakpoint as "until" (${until}), in "getRhythmBpsData"`
    );
  }

  const closestToFrom = from ? getClosestBp(from, rhythmBps, bps) : undefined;
  const closestToUntil = until ? getClosestBp(until, rhythmBps, bps, true) : undefined;

  return getBpsInRange(rhythmBps, closestToFrom, closestToUntil)
    .map((rhythmBp, i, allBps): RhythmBpData => {
      const isLast = i === allBps.length - 1;

      return {
        from: i === 0 && from ? from : rhythmBp === 'default' ? undefined : rhythmBp,
        until: isLast ? until || undefined : allBps[i + 1],
        rhythmBp,
      };
    });
}
