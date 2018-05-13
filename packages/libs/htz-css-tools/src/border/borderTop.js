/* @flow */
import type { BorderStyle, BorderOptions, BorderRuleset, } from './types';

import getBorderOpts from './getBorderOpts';
import setBorder from './setBorder';

/**
 * Set border-top related styles, in a manner that doesn't mess up
 * the vertical rhythm
 *
 * @param optsOrWidth - An options object, or the width of the border. When an
 *   object, must be the only argument passed<ul>
 *   <li>`number` values will be interpreted as being in pixels</li>
 *   <li>`string` values will be used as is</li></ul>
 * @param [lines] - The number of vertical rhythm lines the border +
 *   additional padding should occupy. Mandatory when if not passing an object as the first arg.<br />
 *   Setting `lines` to `0`, will make the element relatively positioned, and
 *   create a pseudo element in the height specified in `width`, stuck to the
 *   relevant edge(s)
 * @param [style] - The border-style
 * @param [color] - The border-color
 *
 * @return - css-in-js object with border related styles, and the correct padding ensuring
 *   the vertical rhythm is kept in tact
 * @private
 *
 * @example
 * borderTop('2px', 1, 'solid', 'red');
 * borderTop({ width: '2px', lines: 1, style: 'solid', color: 'red' });
 *
 * // Both return
 * {
 *   borderTopColor: 'red',
 *   borderTopStyle: 'solid',
 *   borderTopWidth: '2px',
 *   paddingTop: 'calc(1rem - 2px)',
 * }
 *
 * // With zero lines of vertical-rhythm
 * borderTop('2px', 0, 'solid', 'red');
 *
 * // Retruns
 * {
 *   position: 'relative',
 *
 *   ':before': {
 *     backgroundColor: 'red'
 *     content: '',
 *     height: '2px',
 *     position: 'absolute',
 *     top: '0',
 *     width: '100%',
 *   }
 * }
 */
export default function borderTop(
  optsOrWidth: BorderOptions | number | string,
  lines?: number,
  style?: BorderStyle,
  color?: string
): BorderRuleset {
  const borderOptions = getBorderOpts(optsOrWidth, lines, style, color);
  return setBorder('top', ...borderOptions);
}
