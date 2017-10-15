/* @flow */
/**
 * Get a font size based on the properties of a typographic scale
 *
 * @param {number} step - The step in the scale to get (**0 base**)
 * @param {number} [base] - The `font-size` at the base of the scale
 * @param {number} [ratio] - The typographic scale ratio. The multiplier by which
 *   the scaling property of the scale is determined.
 *
 *   If `x` is a size in the typographic scale, than `x * ratio`
 *   will also be size in the ratio, and will occur after `n` steps, as
 *   defined in `stepsPerInterval`.
 * @param {number} [stepsPerInterval] - The number of steps in between intervals of the scale.
 *
 *   If `x` is a size in the scale, it will be incremented to `x * ratio` after
 *   the specified number of steps.
 *
 * @returns {number} - A font size, in pixels, based on the properties of a typographic scale
 *
 * @see [The Typographic Scale](http://spencermortensen.com/articles/typographic-scale/)
 * @private
 */
export default function getFontSize(
  step: number,
  base: number = 16,
  ratio: number = 2,
  stepsPerInterval: number = 5
): number {
  // prettier-ignore
  return Math.round(base * (ratio ** (step / stepsPerInterval)));
}
