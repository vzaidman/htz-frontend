/* @flow */
import type { BorderStyle, BorderOptions, BorderRuleset, } from './types';

import getBorderOpts from './getBorderOpts';
import setBorder from './setBorder';

/**
 * Set border related styles on all sides of an element, in a manner that
 * doesn't mess up the vertical rhythm
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
 * border('2px', 1, 'solid', 'red');
 * border({ width: '2px', lines: 1, style: 'solid', color: 'red' });
 *
 * // Both return
 * {
 *   borderBottomColor: 'red',
 *   borderBottomStyle: 'solid',
 *   borderBottomWidth: '2px',
 *   borderInlineEndColor: 'red',
 *   borderInlineEndStyle: 'solid',
 *   borderInlineEndWidth: '2px',
 *   borderInlineStartColor: 'red',
 *   borderInlineStartStyle: 'solid',
 *   borderInlineStartWidth: '2px',
 *   borderTopColor: 'red',
 *   borderTopStyle: 'solid',
 *   borderTopWidth: '2px',
 *   paddingBottom: 'calc(1rem - 2px)',
 *   paddingTop: 'calc(1rem - 2px)',
 * }
 *
 * // With zero lines of vertical-rhythm
 * border('2px', 0, 'solid', 'red');
 *
 * // Retruns
 * {
 *   borderInlineEndColor: 'red',
 *   borderInlineEndStyle: 'solid',
 *   borderInlineEndWidth: '2px',
 *   borderInlineStartColor: 'red',
 *   borderInlineStartStyle: 'solid',
 *   borderInlineStartWidth: '2px',
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
 *
 *   ':after': {
 *     backgroundColor: 'red'
 *     bottom: '0',
 *     content: '',
 *     height: '2px',
 *     position: 'absolute',
 *     width: '100%',
 *   }
 * }
 */
export default function border(
  optsOrWidth: BorderOptions | number | string,
  lines?: number,
  style?: BorderStyle,
  color?: string
): BorderRuleset {
  const borderOptions = getBorderOpts(optsOrWidth, lines, style, color);
  return setBorder('all', ...borderOptions);
}
