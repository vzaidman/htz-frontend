import { string, number, arrayOf, oneOfType, } from 'prop-types';

/**
 * See refrence at: https://developers.google.com/doubleclick-gpt/reference#type-definitions
 */


/**
 * Array<number>
 * Array of two numbers representing [width, height]
 * */
export const singleSizeArray = arrayOf(number);

/**
 * string | Array<string>
 */
export const namedSize = oneOfType([
  string.isRequired,
  arrayOf(string.isRequired).isRequired,
]);

/**
 * SingleSizeArray | NamedSize
 */
export const singleSize = oneOfType([
  singleSizeArray.isRequired,
  namedSize.isRequired,
]);

/**
 * Array<!googletag.SingleSize>
 */
export const multiSize = arrayOf(singleSize.isRequired);

/**
 * googletag.SingleSize | googletag.MultiSize
 */
export const generalSize = oneOfType([
  singleSize.isRequired,
  multiSize.isRequired,
]);
