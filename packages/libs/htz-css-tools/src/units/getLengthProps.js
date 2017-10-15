/* @flow */

import stripUnit from './stripUnit';
import getUnit from './getUnit';

/**
  * The properties of a css `length` broken into `unit` and `unitlessValue`
  */
type LengthProps = { unit: string, unitlessValue: number };

/**
 * Get the properties of css length number-string
 * as an object with `unitlessValue` and `unit` keys
 *
 * @param {string} length - A css length number-string,
 * e.g., `"10px"` or `"80vw"`.
 *
 * @return The properties of a css `length` broken into `unit` and `unitlessValue`
 *
 * @example
 * getLengthProps('20rem'); => {unitlessValue: 20, unit: "rem"}
 */
export default function getLengthProps(length: string): LengthProps {
  const unitlessValue = stripUnit(length);
  return {
    unitlessValue,
    unit: getUnit(length),
  };
}
