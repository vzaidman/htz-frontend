/* @flow */
import type { BorderStyle, BorderOptions, BorderRuleset, } from './types';

import getBorderOpts from './getBorderOpts';
import setBorder from './setBorder';

/**
 * Set `border-right` related styles.
 *
 * @param optsOrWidth - An options object, or the width of the border. When an
 *   object, must be the only argument passed<ul>
 *   <li>`number` values will be interpreted as being in pixels</li>
 *   <li>`string` values will be used as is</li></ul>
 * @param [style] - The border-style
 * @param [color] - The border-color
 *
 * @return - css-in-js object with border related styles, and the correct padding ensuring
 *   the vertical rhythm is kept in tact
 * @private
 *
 * @example
 * borderRight('2px', 'solid', 'red');
 * borderRight({ width: '2px', style: 'solid', color: 'red' });
 *
 * // Both return
 * {
 *   borderRightColor: 'red',
 *   borderRightStyle: 'solid',
 *   borderRightWidth: '2px',
 * }
 */
export default function borderRight(
  optsOrWidth: BorderOptions | number | string,
  style?: BorderStyle,
  color?: string
): BorderRuleset {
  const borderOptions = getBorderOpts(optsOrWidth, undefined, style, color);
  return setBorder('right', ...borderOptions);
}
