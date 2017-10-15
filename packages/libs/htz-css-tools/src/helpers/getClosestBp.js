/* @flow */
/**
 * A helper to search a subset list for a breakpoint's closest (smaller) neighbor
 *
 * If the passed breakpoint itself is not found in the subset, the name of
 * its closest smaller neighbor that does exist in the subset will be returned.
 *
 * @param {string} bp The breakpoint to search for
 * @param {string[]} subset A subset of breakpoint from which to get the closest one to `bp`
 * @param {string[]} allBps A list of all named breakpoint of which `subset` is a subset.
 * @param {true} [allwaysGetPrior] Determines if the function should always return a prior breakpoint,
 *   even in the event that "bp" is present in "subset".
 *
 * @return A breakpoint name from `subset` that is the closest (smaller) breakpoint to `bp`.
 *
 * @example
 * const rhythmBps = ['s', 'xl'];
 * const allBps = ['s', 'm', 'l', 'xl'];
 * getClosestBp('m', rhythmBps, allBps) // => "s"
 *
 * @private
 */
export default function getClosestBp(
  bp: string,
  subset: string[],
  allBps: string[],
  allwaysGetPrior?: true
): string {
  const bpIndex = allBps.indexOf(bp);
  if (bpIndex === -1) throw new Error(`"${bp}" is not a named breakpoint`);
  if (!allwaysGetPrior && subset.indexOf(bp) !== -1) return bp;
  const prevBp = allBps[bpIndex - 1];
  return bpIndex - 1 === 0
    ? 'default'
    : subset.indexOf(prevBp) !== -1
      ? prevBp
      : getClosestBp(prevBp, subset, allBps);
}
