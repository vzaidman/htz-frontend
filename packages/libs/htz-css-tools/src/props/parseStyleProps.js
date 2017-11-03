/* @flow */

import parseStyleProp from './parseStyleProp';

import type { MqFunc, } from '../mq/mq';
import type { Typesetter, } from '../typography/createTypesetter';
import type { StyleProp, } from './parseStyleProp';

/**
 * Parse an object of styleProps into an array of CSS-in-JS objects
 * (Should always be spread inside and `extend` property)
 *
 * @param styleProps - An object of [`StyleProp`](https://haaretz.github.io/htz-frontend/htz-css-tools#styleprop)s to be parsed.
 * @param mq - a media-query function
 * @param typesetter - a typesetter function
 *
 * @return - an array of CSS-in-JS objects parsed from `styleProps`
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
