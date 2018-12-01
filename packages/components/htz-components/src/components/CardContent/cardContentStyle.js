// @flow
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
type SeperatorColorType = string | [string, ] | [string, string, ];
type SeperatorStyleType =
  | "dashed"
  | "dotted"
  | "double"
  | "groove"
  | "hidden"
  | "inherit"
  | "initial"
  | "inset"
  | "none"
  | "outset"
  | "ridge"
  | "solid"
  | "unset";

type PaddingArray =
  | [number, ]
  | [number, number, ]
  | [number, number, number, ]
  | [number, number, number, number, ];

export type PaddingValueType = number | PaddingArray;

type SeperatorOptions = {
  seperatorColor?: SeperatorColorType,
  seperatorWidth?: number,
  seperatorStyle?: SeperatorStyleType,
};
export type CardContentSeperator = true | SeperatorOptions;

export type ColorType =
  | ?string
  | [string, ]
  | [string, string, ]
  | ComponentPropResponsiveObject<string | [string, ] | [string, string, ]>[];

export type PaddingType =
  | PaddingValueType
  | ComponentPropResponsiveObject<PaddingValueType>[];

export type CardContentStyleOptions = {
  /** A Fela theme object */
  theme: Object,
  backgroundColor: ?ColorType,
  color: ?ColorType,
  padding: ?PaddingType,
  seperator: ?CardContentSeperator,
  miscStyles: ?StyleProps,
};

// //////////////////// //
//   Helper Functions   //
// //////////////////// //

const getSeperatorProps = (
  options: CardContentSeperator,
  themeStyles: Object
): SeperatorOptions => [ 'Color', 'Style', 'Width', ].reduce(
  (result, prop) => ({
    ...result,
    [`seperator${prop}`]:
        options === true
          ? themeStyles[`cardContentSeperator${prop}`]
          : options[prop.toLowerCase()]
            || themeStyles[`cardContentSeperator${prop}`],
  }),
  {}
);

const getPaddingArray = (
  paddingOpts: ?PaddingValueType,
  themeOpts: PaddingValueType
): PaddingArray => {
  const paddingValues = paddingOpts == null ? themeOpts : paddingOpts;

  return Array.isArray(paddingValues) ? paddingValues : [ paddingValues, ];
};

const getPaddingSideValue = (
  paddingValues: PaddingArray,
  pos: 0 | 1 | 2 | 3
): number => {
  // $FlowFixMe
  const valueAtCurrentPos = paddingValues[pos];
  if (valueAtCurrentPos !== undefined) return valueAtCurrentPos;
  // $FlowFixMe
  const correspondingPos = Math.min(paddingValues.length, pos === 3 ? 1 : 0);
  // $FlowFixMe
  return getPaddingSideValue(paddingValues, correspondingPos);
};

const getPaddingValues = (
  paddingOpts: ?PaddingValueType,
  themeOpts: PaddingValueType
): [
  number, // paddingTop
  number, // paddingInlineStart
  number, // paddingBottom
  number, // paddingInlineEnd
] => {
  const paddingArray = getPaddingArray(paddingOpts, themeOpts);

  // The arry type matches the return tuple
  // $FlowFixMe
  return [ 0, 1, 2, 3, ].map(pos => getPaddingSideValue(paddingArray, pos));
};

type BoxModelValues = {
  paddingTop?: string,
  paddingInlineStart?: string,
  paddingBottom?: string,
  paddingInlineEnd?: string,
  borderTopWidth?: string,
  borderTopColor?: string,
  borderTopStyle?: string,
};

function setBoxModel(
  prop: string,
  paddingOptions: ?PaddingValueType,
  seperatorOptions: ?CardContentSeperator,
  cardStyle: Object,
  getColor: ColorGetter
): BoxModelValues {
  const [
    paddingTop,
    paddingInlineStart,
    paddingBottom,
    paddingInlineEnd,
  ] = getPaddingValues(paddingOptions, cardStyle.cardContentPadding);

  const paddingValues = {
    paddingTop: `${paddingTop}rem`,
    paddingInlineStart: `${paddingInlineStart}rem`,
    paddingBottom: `${paddingBottom}rem`,
    paddingInlineEnd: `${paddingInlineEnd}rem`,
  };

  if (!seperatorOptions) return paddingValues;

  const { seperatorColor, seperatorStyle, seperatorWidth, } = getSeperatorProps(
    seperatorOptions,
    cardStyle
  );

  const topBorderAndPaddingProps = borderTop({
    width: seperatorWidth,
    lines: paddingTop,
    style: seperatorStyle,
    color:
      seperatorColor != undefined // eslint-disable-line eqeqeq
        ? getColor(
          ...(Array.isArray(seperatorColor)
            ? seperatorColor
            : [ seperatorColor, ])
        )
        : undefined,
  });

  return {
    ...paddingValues,
    ...topBorderAndPaddingProps,
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
