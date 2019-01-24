// @flow
import type {
  ComponentPropResponsiveObject,
  StyleProps,
} from '@haaretz/htz-css-tools';
import { parseComponentProp, parseStyleProps, } from '@haaretz/htz-css-tools';
import setColor from '../../utils/setColor';

type BackgroundColorType =
  | ?string
  | [string, ]
  | [string, string, ]
  | ComponentPropResponsiveObject<string | [string, ] | [string, string, ]>[];

export type FillHeightType = boolean | ComponentPropResponsiveObject<boolean>[];

export type cardStyleOptions = {
  /** A Fela theme object */
  theme: Object,
  backgroundColor: BackgroundColorType,
  isElevated: ?true,
  fillHeight: ?FillHeightType,
  miscStyles: ?StyleProps,
};

export default function cardStyleRule({
  theme,
  backgroundColor,
  isElevated,
  fillHeight,
  miscStyles,
}: cardStyleOptions): Object {
  const { cardStyle, } = theme;
  return {
    boxShadow: isElevated
      ? cardStyle.cardElevatedBoxShadow
      : cardStyle.cardBoxShadow,
    // Set the theme's default background-color with no media query,
    // in case a responsive one is set for only some media queries
    // (in the `extend` block)
    ...setColor('backgroundColor', cardStyle.cardBackgroundColor, theme.color),
    display: 'flex',
    flexDirection: 'column',
    // A card's content should always be contained inside it
    overflow: 'hidden',
    extend: [
      // Set background-color
      // eslint-disable-next-line space-infix-ops, no-mixed-operators
      parseComponentProp<BackgroundColorType>(
        'backgroundColor',
        backgroundColor || cardStyle.cardBackgroundColor,
        theme.mq,
        setColor,
        theme.color
      ),
      // fill height of parent
      ...[
        fillHeight
          ? parseComponentProp<FillHeightType>( // eslint-disable-line space-infix-ops, no-mixed-operators
            'fillHeight',
            fillHeight,
            theme.mq,
            setFillHeight
          )
          : {},
      ],
      // Trump all other styles with those defined in `miscStyles`
      ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
    ],
  };
}

function setFillHeight(prop: string, shouldFillHeight: boolean): Object {
  return shouldFillHeight ? { height: '100%', } : {};
}
