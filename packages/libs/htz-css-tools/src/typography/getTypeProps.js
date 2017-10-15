/* @flow */

import getFontSize from './getFontSize';
import getLineHeight from './getLineHeight';

/**
 * The typographic properties of an item in a typographic scale.
 *
 * @prop {number} fontSize - The `font-size` in pixels
 * @prop {number} lineHeight - The `line-height` in pixels
 * @prop {number} relativeLineHeight - The line-height as a multiplier of the font-size
 * @prop {number} lines - The number of rhythm lines the line-height occupies
 */
export type TypeProps = {|
  fontSize: number,
  lineHeight: number,
  relativeLineHeight: number,
  lines: number
|};

/**
 * Options object for the `getTypeProps` function
 *
 * @property {number} step
 *   The step in the scale to get. **The typographic scale is 0 based, so `0`
 *   here will return the number set in base**
 * @property {number} [base]
 *   The `font-size` at the base of the scale
 * @property {number} [rhythmUnit]
 *   The basic unit used to set the vertical rhythm to which the
 *   `line-height` should conform.
 *   The typographic scale ratio. The multiplier by which the scaling property
 *   of the scale is determined.
 *
 *   If `x` is a size in the typographic scale, than `x * ratio`
 *   will also be size in the ratio, and will occur after `n` steps, as
 *   defined in `stepsPerInterval`.
 * @property {number} [minPadding]
 *   The minimal amount of padding (in pixels) each line should have below and
 *   above the text. A `font-size`'s `line-height` must, at minimum, conform to:
 *   `(lineHeight - fontSize) / 2  >= minPadding`.
 * @property {number} [ratio]
 * @property {number} [stepsPerInterval]
 *   The number of steps in between intervals of the scale.
 *
 *   If `x` is a size in the scale, it will be incremented to `x * ratio` after
 *   the specified number of steps.
 */
export type GetTypePropsOpts = {
  step: number,
  base?: number,
  rhythmUnit?: number,
  minPadding?: number,
  ratio?: number,
  stepsPerInterval?: number
};

/**
 * Get the properties of an item in a typographic scale.
 *
 * @param {GetTypePropsOpts} options
 * @param {number} options.step
 *   The step in the scale to get. **The typographic scale is 0 based, so `0`
 *   here will return the number set in base**
 * @param {number} [options.base=16]
 *   The `font-size` at the base of the scale
 * @param {number} [options.rhythmUnit=6]
 *   The basic unit used to set the vertical rhythm to which the
 *   `line-height` should conform.
 *   The typographic scale ratio. The multiplier by which the scaling property
 *   of the scale is determined.
 *
 *   If `x` is a size in the typographic scale, than `x * ratio`
 *   will also be size in the ratio, and will occur after `n` steps, as
 *   defined in `stepsPerInterval`.
 * @param {number} [options.minPadding=2]
 *   The minimal amount of padding (in pixels) each line should have below and
 *   above the text. A `font-size`'s `line-height` must, at minimum, conform to:
 *   `(lineHeight - fontSize) / 2  >= minPadding`.
 * @param {number} [options.ratio=2]
 * @param {number} [options.stepsPerInterval=5]
 *   The number of steps in between intervals of the scale.
 *
 *   If `x` is a size in the scale, it will be incremented to `x * ratio` after
 *   the specified number of steps.
 *
 * @returns {TypeProps}
 *   The typographic properties of an item in a typographic scale.
 * @private
 */
export default function getTypeProps(
  {
    step,
    base = 16,
    rhythmUnit = 6,
    minPadding = 2,
    ratio = 2,
    stepsPerInterval = 5,
  }: GetTypePropsOpts = {}
): TypeProps {
  if (step === undefined) {
    throw new Error(
      'A (zero-based) "step" in the typographic scale must be defined'
    );
  }
  const fontSize = getFontSize(step, base, ratio, stepsPerInterval);
  const lineHeight = getLineHeight(fontSize, rhythmUnit, minPadding);
  return {
    fontSize,
    lineHeight,
    lines: lineHeight / rhythmUnit,
    relativeLineHeight: lineHeight / fontSize,
  };
}
