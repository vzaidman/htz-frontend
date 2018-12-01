/* globals window */
import hasMatchMedia from './hasMatchMedia';

/** The default font-size in every browser known to man */
const DEFAULT_BROWSER_FONT_SIZE = 16;

/**
 * An object describing a media query and the value associated with it.
 * @typedef {object} query
 *
 * @prop {string} [from] - A named width breakpoint used as `min-width`
 * @prop {string} [until] - A named width breakpoint used as `max-width`
 * @prop {string} [misc] - A named miscellaneous media-query.
 * @prop {*} value - The values associated with the query
 */

/**
 * Returns the value of the first query that matches the current window size.
 *
 * @param {object} bps - An object of named breakpoints to match the queries against
 * @param {object} bps.widths - An object of named width-breakpoint and their boundary value
 * @param {object} bps.misc - An object of named miscellaneous media-queries
 *
 * @param {object} options
 * @param {query[]} options.queries
 *   An array of objects describing a media query and the value to return when the query matches
 * @param {number} [options.queries[].from] - A named width breakpoint used as the min-width boundary point
 * @param {number} [options.queries[].until] - A named width breakpoint used as the max-width boundary point
 * @param {string} [options.queries[].misc] - A named misc breakpoint
 * @param {string} [options.queries[].type] - A media type (e.g., `screen`, `print`, etc.)
 * @param {string} [options.queries[].value] - The value to use if the query matches.
 *
 * @return {*} - The value associated with the first query that matches the current window size
 */
export default function mediaMatchesQuery(bps, { queries, }) {
  if (!hasMatchMedia()) return undefined;

  for (const query of queries) {
    const from = bps.widths[query.from];
    const until = bps.widths[query.until];
    const misc = bps.misc[query.misc];

    const minQuery = from
      ? `(min-width:${from / DEFAULT_BROWSER_FONT_SIZE}em)`
      : '';
    const maxQuery = until
      ? `${from ? ' and ' : ''}(max-width:${(until - 1)
          / DEFAULT_BROWSER_FONT_SIZE}em)`
      : '';
    const miscQuery = misc ? `${from || until ? ' and ' : ''}${misc}` : '';

    if (window.matchMedia(minQuery + maxQuery + miscQuery).matches) {
      return query.value;
    }
  }

  return undefined;
}
