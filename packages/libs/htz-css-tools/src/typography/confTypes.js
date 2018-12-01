// @flow
// ////////////////////////////////////////////////////////////////// //
//            Interfaces for typographic Settings objects             //
// ////////////////////////////////////////////////////////////////// //

/**
 * Base configuration options for setting up harmonious typographic scales.
 *
 * @property {number} base
 *   The base `font-size`, usually set on the `body` element.
 * @property {number} steps
 *   The number of steps in between intervals of the scale.
 *
 *   If `x` is a size in the scale, it will be incremented to
 *   `x * ratio` after specified number of steps.
 *
 *   @see [The Typographic Scale](http://spencermortensen.com/articles/typographic-scale/)
 * @property {number} ratio
 *   The typographic scale ratio. The multiplier by which
 *   the scaling property of the scale is determined.
 *
 *   If `x` is a size in the typographic scale, than `x * ratio`
 *   will also be size in the ratio, and will occur after `n` steps, as
 *   defined in `steps`.
 *
 *   @see [The Typographic Scale](http://spencermortensen.com/articles/typographic-scale/)
 * @property {number} rhythmUnit
 *   The basic spacing unit used throughout to construct consistent
 *   `rem`-based vertical rhythm systems by setting the `font size`
 *   property on the `html` element.
 * @property {number} minPadding
 *    The minimal amount of padding (in pixels) each line should have below and
 *    above the text.
 *    A `font-size`'s `line-height` must, at minimum, conform to:
 *    `(lineHeight - fontSize) / 2  >= minPadding`.
 *
 * @example
 * {
 *   base: 18,
 *   minPadding: 2,
 *   ratio: 2,
 *   rhythmUnit: 7,
 *   steps: 5,
 * },
 */
export type TypeScaleOpts = {
  base: number,
  steps: number,
  ratio: number,
  rhythmUnit: number,
  minPadding: number,
};

/**
 * **Typographic Scale Configuration**<br />
 * A configuration object Containing named breakpoints as keys, and
 * `TypeScaleOpts` objects as values for each such breakpoint.<br />
 * Must contain at least a `default` key, holding the  default typographic
 * scale options.
 *
 * Breakpoints for which `TypeScaleOpts` aren't explicitly set, will inherit
 * the options of the breakpoint preceding them.<br />
 * With the exception of `default`, which is mandatory, breakpoint names must
 * correspond with those defined in the breakpoint configuration.
 * Larger breakpoints override smaller ones.
 *
 * @example
 * const typeConf = {
 *   default: {
 *     base: 16,
 *     minPadding: 2,
 *     ratio: 2,
 *     rhythmUnit: 6,
 *     steps: 5,
 *   },
 *   l: {
 *     base: 18,
 *     minPadding: 2,
 *     ratio: 2,
 *     rhythmUnit: 7,
 *     steps: 5,
 *   },
 * };
 */
export type TypeConf = {
  default: TypeScaleOpts,
  [bpName: string]: TypeScaleOpts,
};
