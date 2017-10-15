/* @flow */
/**
 * Convert a css length number-string to a `number`.
 *
 * @param length - A css length number-string, e.g., `"10px"` or `"80vw"`.
 * @throws {Error} When `length` cannot be cast into a number
 *
 * @return The length as a `number` primitive
 *
 * @example
 * const unitless = stripUnit('10px');
 * console.log(unitless) // Logs `10`
 */
export default function stripUnit(length: string): number {
  const unitlessValue = parseFloat(length);
  if (isNaN(unitlessValue)) {
    throw new Error(`"${length}" cannot be converted to a number`);
  }
  return unitlessValue;
}
