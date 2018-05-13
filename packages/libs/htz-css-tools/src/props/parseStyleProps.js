/* @flow */

import parseStyleProp from './parseStyleProp';

import type { MqFunc, } from '../mq/createMqFunc';
import type { Typesetter, } from '../typography/createTypesetter';
import type { StyleProp, } from './parseStyleProp';

/**
 * Parse an object of miscellaneous styles into an array of CSS-in-JS
 * objects (Should always be spread inside Fela's `extend` property).
 *
 * @param styleProps
 *   An object of [`StyleProp`](#styleprop)s to be parsed.
 *
 *   The values assigned to each key are used as is, and are
 *   not parsed in any way, with the following exceptions:
 *
 *     1) `type`: Value will be passed to the `typesetter` function.
 *     2) `visuallyHidden`: will add styles to make an element
 *        hidden from sighted users, but accessible to assistive tech.
 *        setting the value of a `visuallyHidden` key to `'focusable'`
 *        will also add styles that will make the element visible when
 *        focused.
 *     3) `autospace`:  Value will be passed to the `autospace` function.
 * @param mq - a media-query function
 * @param typesetter - a typesetter function
 *
 * @return - an array of CSS-in-JS objects parsed from `styleProps`
 *
 *
 * @example
 * <MyComponoent
 *   miscStyles={{
 *     color: 'red',
 *     type: 2,
 *     width: [ {from : 's', value: '6rem'}, ],
 *   }}
 * />
 *
 * const MyComponoentStyles = (props) => ({
 *   extend: [
 *     ...(
 *       props.miscStyles
 *         ? parseStyleProps(props.miscStyles, props.theme.mq, props.theme.type)
 *         : []
 *     ),
 *   ]
 * });
 *
 */
export default function parseStyleProps(
  styleProps: { [key: string]: StyleProp },
  mq: MqFunc,
  typesetter: Typesetter
): (Object | void)[] {
  return Object.keys(styleProps)
    .map(key => parseStyleProp(key, styleProps[key], mq, typesetter))
    .filter(item => !!item);
}
