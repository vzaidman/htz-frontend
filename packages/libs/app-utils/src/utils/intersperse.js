/**
 * places a delimiter between items in an array.
 * @description like String.join only it returns an array instead of a string.
 * @param {Array} arr
 * @param {*} delim
 * @example intersperse([1, 2, 3], "&") => [1, "&", 2, "&", 3]
 */
const intersperse = (arr, delim) => [].concat(
  ...arr.map(elem => [ delim, elem, ])
).slice(1);

export default intersperse;
