/* @flow */
import stripUnit from './stripUnit';

/**
 * Extract the css length-unit from a number-string.
 *
 * @param length A css length number-string,
 * e.g., `"10px"` or `"80vw"`.
 *
 * @return The unit of a css length number-string
 *
 * @example
 * const unit = getUnit('10rem');
 * console.log(unit) // Logs `rem`
 *
 * const noUnit = getUnit('10');
 * console.log(noUnit) // Logs `unitless`
 */
export default function getUnit(length: string): string {
  const unitlessValue = stripUnit(length);
  return length.slice(unitlessValue.toString().length) || 'unitless';
}
