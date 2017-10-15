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
 *   '&:before': {
 *     backgroundColor: 'red'
 *     content: '',
 *     height: '2px',
 *     position: 'absolute',
 *     top: '0',
 *     width: '100%',
 *   }
 *
 *   '&:after': {
 *     backgroundColor: 'red'
 *     bottom: '0',
 *     content: '',
 *     height: '2px',
 *     position: 'absolute',
 *     width: '100%',
 *   }
 * }
 */
export function border(
  optsOrWidth: BorderOptions | number,
  lines?: number,
  style?: BorderStyle,
  color?: string
): BorderRuleset {
  const borderOptions = getBorderOpts(optsOrWidth, lines, style, color);
  return setBorder('all', ...borderOptions);
}

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
 *   '&:before': {
 *     backgroundColor: 'red'
 *     content: '',
 *     height: '2px',
 *     position: 'absolute',
 *     top: '0',
 *     width: '100%',
 *   }
 * }
 */
export function borderTop(
  optsOrWidth: BorderOptions | number,
  lines?: number,
  style?: BorderStyle,
  color?: string
): BorderRuleset {
  const borderOptions = getBorderOpts(optsOrWidth, lines, style, color);
  return setBorder('top', ...borderOptions);
}

/**
 * Set `border-inline-end` related styles.
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
 * borderEnd('2px', 'solid', 'red');
 * borderEnd({ width: '2px', style: 'solid', color: 'red' });
 *
 * // Both return
 * {
 *   borderInlineEndColor: 'red',
 *   borderInlineEndStyle: 'solid',
 *   borderInlineEndWidth: '2px',
 * }
 */
export function borderEnd(
  optsOrWidth: BorderOptions | number,
  style?: BorderStyle,
  color?: string
): BorderRuleset {
  const borderOptions = getBorderOpts(optsOrWidth, undefined, style, color);
  return setBorder('end', ...borderOptions);
}

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
export function borderRight(
  optsOrWidth: BorderOptions | number,
  style?: BorderStyle,
  color?: string
): BorderRuleset {
  const borderOptions = getBorderOpts(optsOrWidth, undefined, style, color);
  return setBorder('right', ...borderOptions);
}

/**
 * Set `border-bottom` related styles, in a manner that doesn't mess up
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
 * borderBottom('2px', 1, 'solid', 'red');
 * borderBottom({ width: '2px', lines: 1, style: 'solid', color: 'red' });
 *
 * // Both return
 * {
 *   borderBottomColor: 'red',
 *   borderBottomStyle: 'solid',
 *   borderBottomWidth: '2px',
 *   paddingBottom: 'calc(1rem - 2px)',
 * }
 *
 * // With zero lines of vertical-rhythm
 * borderBottom('2px', 0, 'solid', 'red');
 *
 * // Retruns
 * {
 *   position: 'relative',
 *
 *   '&:after': {
 *     backgroundColor: 'red'
 *     bottom: '0',
 *     content: '',
 *     height: '2px',
 *     position: 'absolute',
 *     width: '100%',
 *   }
 * }
 */
export function borderBottom(
  optsOrWidth: BorderOptions | number,
  lines?: number,
  style?: BorderStyle,
  color?: string
): BorderRuleset {
  const borderOptions = getBorderOpts(optsOrWidth, lines, style, color);
  return setBorder('bottom', ...borderOptions);
}

/**
 * Set `border-insline-start` related styles.
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
 * borderStart('2px', 'solid', 'red');
 * borderStart({ width: '2px', style: 'solid', color: 'red' });
 *
 * // Both return
 * {
 *   borderInlineStartColor: 'red',
 *   borderInlineStartStyle: 'solid',
 *   borderInlineStartWidth: '2px',
 * }
 */
export function borderStart(
  optsOrWidth: BorderOptions | number,
  style?: BorderStyle,
  color?: string
): BorderRuleset {
  const borderOptions = getBorderOpts(optsOrWidth, undefined, style, color);
  return setBorder('start', ...borderOptions);
}

/**
 * Set `border-left` related styles.
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
 * borderLeft('2px', 'solid', 'red');
 * borderLeft({ width: '2px', style: 'solid', color: 'red' });
 *
 * // Both return
 * {
 *   borderLeftColor: 'red',
 *   borderLeftStyle: 'solid',
 *   borderLeftWidth: '2px',
 * }
 */
export function borderLeft(
  optsOrWidth: BorderOptions | number,
  style?: BorderStyle,
  color?: string
): BorderRuleset {
  const borderOptions = getBorderOpts(optsOrWidth, undefined, style, color);
  return setBorder('left', ...borderOptions);
}

/**
 * Set `border-insline-start` and `border-inline-end` related styles.
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
 * borderHorizontal('2px', 'solid', 'red');
 * borderHorizontal({ width: '2px', style: 'solid', color: 'red' });
 *
 * // Both return
 * {
 *   borderInlineEndColor: 'red',
 *   borderInlineEndStyle: 'solid',
 *   borderInlineEndWidth: '2px',
 *   borderInlineStartColor: 'red',
 *   borderInlineStartStyle: 'solid',
 *   borderInlineStartWidth: '2px',
 * }
 */
export function borderHorizontal(
  optsOrWidth: BorderOptions | number,
  style?: BorderStyle,
  color?: string
): BorderRuleset {
  const borderOptions = getBorderOpts(optsOrWidth, undefined, style, color);
  return setBorder('horizontal', ...borderOptions);
}

/**
 * Set `border-top` and `border-bottom` related styles, in a manner that
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
 * borderVertical('2px', 1, 'solid', 'red');
 * borderVertical({ width: '2px', lines: 1, style: 'solid', color: 'red' });
 *
 * // Both return
 * {
 *   borderBottomColor: 'red',
 *   borderBottomStyle: 'solid',
 *   borderBottomWidth: '2px',
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
 *   position: 'relative',
 *
 *   '&:before': {
 *     backgroundColor: 'red'
 *     content: '',
 *     height: '2px',
 *     position: 'absolute',
 *     top: '0',
 *     width: '100%',
 *   }
 *
 *   '&:after': {
 *     backgroundColor: 'red'
 *     bottom: '0',
 *     content: '',
 *     height: '2px',
 *     position: 'absolute',
 *     width: '100%',
 *   }
 * }
 */
export function borderVertical(
  optsOrWidth: BorderOptions | number,
  lines?: number,
  style?: BorderStyle,
  color?: string
): BorderRuleset {
  const borderOptions = getBorderOpts(optsOrWidth, lines, style, color);
  return setBorder('vertical', ...borderOptions);
}
