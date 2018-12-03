import type {
  ComponentPropResponsiveObject,
  StyleProps,
  ColorGetter,
} from '@haaretz/htz-css-tools';

import {
  parseComponentProp,
  parseStyleProps,
  borderTop,
} from '@haaretz/htz-css-tools';
import setColor from '../../utils/setColor';

// ///////// //
//   Types   //
// ///////// //
type SeperatorColor = string | [string] | [string, string];
type SeperatorStyle =
  | 'dashed'
  | 'dotted'
  | 'double'
  | 'groove'
  | 'hidden'
  | 'inherit'
  | 'initial'
  | 'inset'
  | 'none'
  | 'outset'
  | 'ridge'
  | 'solid'
  | 'unset';

type SeperatorOptions = {|
  color?: SeperatorColor,
  width?: number,
  style?: SeperatorStyle,
|};

type PaddingArray =
  | [number]
  | [number, number]
  | [number, number, number]
  | [number, number, number, number];
export type CardContentPadding = number | PaddingArray;
export type CardContentSeperator = true | SeperatorOptions;

export type CardContentStyleOptions = {
  /** A Fela theme object */
  theme: Object,
  backgroundColor:
    | ?string
    | [string]
    | [string, string]
    | {
        ...ComponentPropResponsiveObject,
        value: string | [string] | [string, string],
      }[],
  color:
    | ?string
    | [string]
    | [string, string]
    | {
        ...ComponentPropResponsiveObject,
        value: string | [string] | [string, string],
      }[],
  padding:
    | ?CardContentPadding
    | {
        ...ComponentPropResponsiveObject,
        value: CardContentPadding,
      },
  seperator: ?CardContentSeperator,
  miscStyles: ?StyleProps,
};

// //////////////////// //
//   Helper Functions   //
// //////////////////// //

const getSeperatorProps = (
  options: CardContentSeperator,
  themeStyles: Object
): SeperatorOptions =>
  [ 'Color', 'Style', 'Width', ].reduce(
    (result, prop) => ({
      ...result,
      [`seperator${prop}`]:
        options[prop.toLowerCase()] ||
        themeStyles[`cardContentSeperator${prop}`],
    }),
    {}
  );

const getPaddingArray = (
  paddingOpts: CardContentPadding,
  themeOpts: CardContentPadding
): PaddingArray => {
  const paddingValues = paddingOpts == null ? themeOpts : paddingOpts;

  return Array.isArray(paddingValues) ? paddingValues : [ paddingValues, ];
};

const getPaddingSideValue = (
  paddingValues: PaddingArray,
  pos: 0 | 1 | 2 | 3
): number => {
  const valueAtCurrentPos = paddingValues[pos];
  if (valueAtCurrentPos !== undefined) return valueAtCurrentPos;
  const correspondingPos = Math.min(paddingValues.length, pos === 3 ? 1 : 0);
  return getPaddingSideValue(paddingValues, correspondingPos);
};

const getPaddingValues = (
  paddingOpts: CardContentPadding,
  themeOpts: CardContentPadding
): {
  paddingTop: number,
  paddingInlineStart: number,
  paddingBottom: number,
  paddingInlineEnd: number,
} => {
  const paddingArray = getPaddingArray(paddingOpts, themeOpts);

  return [ 0, 1, 2, 3, ].map(pos => getPaddingSideValue(paddingArray, pos));
};

function setBoxModel(
  prop: string,
  paddingOptions: ?CardContentPadding,
  seperatorOptions: ?CardContentSeperator,
  cardStyle: Object,
  getColor: ColorGetter
): {
  paddingTop?: string,
  paddingInlineStart?: string,
  paddingBottom?: string,
  paddingInlineEnd?: string,
  borderTopWidth?: string,
  borderTopColor?: string,
  borderTopStyle?: string,
} {
  const [
    paddingTop,
    paddingInlineStart,
    paddingBottom,
    paddingInlineEnd,
  ] = getPaddingValues(paddingOptions, cardStyle.cardContentPadding);

  if (!seperatorOptions) {
    return {
      paddingTop,
      paddingInlineStart,
      paddingBottom,
      paddingInlineEnd,
    };
  }
  const { seperatorColor, seperatorStyle, seperatorWidth, } = getSeperatorProps(
    seperatorOptions,
    cardStyle
  );

  const seperatorColorArgs = Array.isArray(seperatorColor)
    ? seperatorColor
    : [ seperatorColor, ];

  const topBorderAndPaddingProps = borderTop({
    width: seperatorWidth,
    lines: paddingTop,
    style: seperatorStyle,
    color: seperatorColor ? getColor(...seperatorColorArgs) : undefined,
  });

  return {
    ...topBorderAndPaddingProps,
    paddingInlineStart,
    paddingBottom,
    paddingInlineEnd,
  };
}

// ///////////////// //
//   Main Function   //
// ///////////////// //

export default function cardContentStyle({
  theme,
  backgroundColor,
  color,
  padding,
  seperator,
  miscStyles,
}: CardContentStyleOptions): Object {
  return {
    display: 'flex',
    flexDirection: 'column',
    // A card's content should always be contained inside it
    overflow: 'hidden',
    extend: [
      // Set background-color
      ...(backgroundColor
        ? [
          parseComponentProp(
            'backgroundColor',
            backgroundColor,
            theme.mq,
            setColor,
            theme.color
          ),
        ]
        : []),
      ...(color
        ? [ parseComponentProp('color', color, theme.mq, setColor, theme.color), ]
        : []),
      parseComponentProp(
        'padding and seperator',
        padding,
        theme.mq,
        setBoxModel,
        seperator,
        theme.cardStyle,
        theme.color
      ),
      // Trump all other styles with those defined in `miscStyles`
      ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
    ],
  };
}
