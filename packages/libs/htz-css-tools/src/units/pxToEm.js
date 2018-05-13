/* @flow */
import type { PxToUnitConverter, } from './pxTo.js';
import pxTo from './pxTo.js';

/**
 * A `px` to `em` converter
 *
 * @param {number|number[]} pxVal
 *   The number, in pixels to convert into `em`.
 * @param {number} context
 *   The number, in pixels to be used as the base for converting `pxVal` to `em`.
 *   Should be the font-size of the parent element.
 *
 * @returns {string} `pxVal` converted to `em` based on `context`.
 *
 * @example
 * // Single value
 * pxToEm(32, 16) // => '2em'
 *
 * // Array of values
 * pxToEm([8, 24], 16) // => '0.5em 1.5em'
 */
const pxToEm: PxToUnitConverter = /* #__PURE__ */ pxTo('em');

export default pxToEm;
