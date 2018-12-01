// @flow

import {
  parseComponentProp,
  parseStyleProps,
  parseTypographyProp,
} from '@haaretz/htz-css-tools';

import type {
  ComponentPropResponsiveObject,
  StyleProps,
  TypographyPropType,
} from '@haaretz/htz-css-tools';

import setColor from '../../utils/setColor';

type StyleTypes = {
  /**
   * The font-size and line height of the headline
   * Can be:
   *   - A `number` representing a step in the typographic scale.
   *   - an object of the following structure:
   *     ```ts
   *     {
   *       step: number, // A step in the typographic scale
   *       lines?: number, // overrides the default number of vertical rhythm
   *                       // lines each line of text occupies.
   *     }
   *     ```
   *   - An array of objects representing media queries, in
   *     the following structure:
   *     ```
   *     {
   *       from?: string,
   *       until?: string,
   *       misc?: string,
   *       value: number | the above object,
   *     }
   *     ```
   */
  typeScale: ?TypographyPropType,
  /**
   * The color of the headline
   * Can be:
   *   - A `string` representing a named color.
   *   - A `tuple` of two `string`s, the first representing.
   *     a named color, and the second representing a variant
   *     of that named color.
   *   - An array of objects representing media queries, in
   *     the following structure:
   *     ```
   *     {
   *       from?: string,
   *       until?: string,
   *       misc?: string,
   *       value: string or tuple, as mentioned above,
   *     }
   *     ```
   */
  color:
    | ?string
    | [string, ]
    | [string, string, ]
    | ComponentPropResponsiveObject<string | [string, ] | [string, string, ]>[],
  /**
   * A special property holding miscellaneous CSS values that
   * trump all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: ?StyleProps,
  theme: Object,
};

export default function style({
  typeScale,
  color,
  theme,
  miscStyles,
}: StyleTypes): Object {
  return {
    fontWeight: '700',
    extend: [
      // Set background-color
      ...[
        color
          ? parseComponentProp('color', color, theme.mq, setColor, theme.color)
          : {},
      ],

      // Set font-size and line-height
      ...[
        typeScale ? parseTypographyProp(typeScale, theme.type) : {},
        // Trump all other styles with those defined in `miscStyles`
        ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
      ],
    ],
  };
}
