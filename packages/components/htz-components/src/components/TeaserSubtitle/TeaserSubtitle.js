// @flow

import * as React from 'react';
import { FelaComponent, } from 'react-fela';

import type {
  ComponentPropResponsiveObject,
  StyleProps,
  TypographyPropType,
} from '@haaretz/htz-css-tools';

import type { attrFlowType, } from '../../flowTypes/attrTypes';
import TeaserResponsiveText from '../TeaserResponsiveText/TeaserResponsiveText';

import style from '../TeaserHeader/teaserHeaderStyle';

type TeaserSubtitleProps = {
  /**
   * attributes to be passed to the DOM element
   */
  attrs: attrFlowType,
  subtitle: string,
  subtitleMobile: string,

  /**
   * The font-size and line height of the subtitle
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
  typeScale: TypographyPropType,
  /**
   * The color of the subtitle
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
    | string
    | [string, ]
    | [string, string, ]
    | ComponentPropResponsiveObject<string | [string, ] | [string, string, ]>[],
  /**
   * A special property holding miscellaneous CSS values that
   * trump all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: StyleProps,
  tagName: string,
};

TeaserSubtitle.defaultProps = {
  attrs: null,
  tagName: 'p',
  // data props
  subtitle: null,
  subtitleMobile: null,
  // style props
  typeScale: null,
  color: null,
  miscStyles: null,
};

export default function TeaserSubtitle({
  attrs,
  tagName,
  // data props
  subtitle,
  subtitleMobile,
  // style props
  typeScale,
  color,
  miscStyles,
}: TeaserSubtitleProps): React.Node {
  const Component = tagName;
  return (
    <FelaComponent
      color={color}
      typeScale={typeScale}
      miscStyles={miscStyles}
      rule={style}
      render={({ className, }) => (
        <Component className={className} attrs={attrs}>
          <TeaserResponsiveText text={subtitle} mobileText={subtitleMobile} />
        </Component>
      )}
    />
  );
}
