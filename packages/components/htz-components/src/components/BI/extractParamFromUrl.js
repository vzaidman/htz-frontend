/* global window */

/**
 * A function that extracts query parameter values from a URL string
 * @export
 * @param {any} param the name of the query parameter
 * @param {any} [url=window.location.href] optional URL string to parse
 * @returns null if no param is present in the URL, an empty string if it
 * is a valueless key that is present, and the string value if one is found.
 */
export default function extractParameter(param, url = window.location.href) {
  const name = param.replace(/[[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
