/* @flow */
const CONVERTIBLE_UNITS: string[] = [
  'in',
  'mm',
  'cm',
  'pt',
  'pc',
  'px',
  'em',
  'rem',
  '%',
  'ex',
];

/** A unit that can be converted to from `px` */
type TargetUnit =
  | 'in'
  | 'mm'
  | 'cm'
  | 'pt'
  | 'pc'
  | 'px'
  | 'em'
  | 'rem'
  | '%'
  | 'ex';

/**
 * A function that converts pixel values to target unit designated by the factory function.
 *
 * @param {number|number[]} pxVal
 *   The number, in pixels to convert to the specified unit.
 * @param {number} context
 *   The number, in pixels to be used as the base for converting `pxVal` to the target unit.
 *
 * @returns {string} - A converted number-string in the target unit.
 *
 * @example
 * // Create a `px` to `pt` converter
 * const pxToPtConverter = pxTo('pt');
 *
 * // pt is always (px * 0.75 )
 * const pxToPt = (pxValue) => pxToPtConverter(pxValue, 0.75);
 */
export type PxToUnitConverter = (
  pxVal: number | number[],
  context: number
) => string;

/**
 * A factory function to create converters from pixel-values to another css-length unit
 *
 * @param targetUnit <br />
 *   The unit to convert from `pixel` to.<br />
 *   May only be a convertible unit, i.e., one of 'in', 'mm', 'cm', 'pt', 'pc', 'px', 'em', 'rem', '%', 'ex'.
 *
 * @returns A function that converts pixel values to the designated unit.
 *
 * @example
 * // Create a `px` to `pt` converter
 * const pxToPt = pxTo('pt');
 */
// eslint-disable-next-line no-undef
export default function pxTo(targetUnit: TargetUnit): PxToUnitConverter {
  const unit = targetUnit.toLowerCase();

  if (CONVERTIBLE_UNITS.indexOf(unit) === -1) {
    throw new Error(
      `"pxTo()" cannot create a converter from pixels to the "${targetUnit}" unit`
    );
  }

  // eslint-disable-next-line func-names
  return function (pxVal: number | number[], context: number): string {
    return Array.isArray(pxVal)
      ? pxVal.reduce(
        (result, item) =>
          `${result}${result ? ' ' : ''}${item / context}${unit}`,
        ''
      )
      : `${pxVal / context}${unit}`;
  };
}
