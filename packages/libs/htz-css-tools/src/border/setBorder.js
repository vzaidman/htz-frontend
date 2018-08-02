/* @flow */

import type { BorderSide, BorderStyle, BorderRuleset, } from './types';

/**
 * Generate a css-in-js object with border related styles, in a manner that
 * doesn't mess up the vertical rhythm
 *
 * @param side - The side(s) of the element to set borders for
 * @param width - The width of the border.<ul>
 *   <li>`number` values will be interpreted as being in pixels</li>
 *   <li>`string` values will be used as is</li></ul>
 * @param [lines] - The number of vertical rhythm lines the border +
 *   additional padding should occupy. Only relevant (and mandatory) with borders
 *   on the vertical plane.<br />
 *   Setting `lines` to `0`, will make the element relatively positioned, and
 *   create a pseudo element in the height specified in `width`, stuck to the
 *   relevant endge(s)
 * @param style - The border-style
 * @param color - The border-color
 *
 * @return - css-in-js object with border related styles, and the correct padding ensuring
 *   the vertical rhythm is kept in tact
 * @private
 *
 * @example
 * // vertical plane border
 * setBorder(
 *   'top',
 *   '2px',
 *   1,
 *   'solid',
 *   'red'
 * );
 *
 * // Retruns
 * {
 *   borderTopColor: 'red',
 *   borderTopStyle: 'solid',
 *   borderTopWidth: '2px',
 *   paddingTop: 'calc(1rem - 2px)',
 * }
 *
 * // vertical plane border, zero lines
 * setBorder(
 *   'top',
 *   '2px',
 *   0,
 *   'solid',
 *   'red'
 * );
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
export default function setBorder(
  side: BorderSide,
  width: number | string,
  lines?: number,
  style?: BorderStyle,
  color?: string
): BorderRuleset {
  const widthValue = typeof width === 'number' ? `${width}px` : width;
  const sides = getSides(side);
  const { horizontalSides, verticalSides, } = sides;
  const horizontalRuleSet = horizontalSides
    ? setBorderStyleRules(horizontalSides, widthValue, style, color)
    : undefined;

  if (lines === 0 && verticalSides) {
    // type RulesetType = {
    //   ':after'?: Object,
    //   ':before'?: Object,
    //   position: string,
    // }
    const ruleSet: BorderRuleset = {
      ...horizontalRuleSet,
      position: 'relative',
    };

    const pseudoElRules = {
      ...(typeof color === 'undefined'
        ? undefined
        : { backgroundColor: color, }),
      content: '""',
      height: widthValue,
      position: 'absolute',
      width: '100%',
    };

    if (verticalSides.includes('top')) {
      ruleSet[':before'] = {
        ...pseudoElRules,
        top: '0',
      };
    }
    if (verticalSides.includes('bottom')) {
      ruleSet[':after'] = {
        ...pseudoElRules,
        bottom: '0',
      };
    }

    return ruleSet;
  }

  return {
    ...horizontalRuleSet,
    ...(verticalSides
      ? setBorderStyleRules(
        verticalSides,
        widthValue,
        style,
        color,
        lines,
        true
      )
      : undefined),
  };
}

function setBorderStyleRules(
  sides: string[],
  width: string,
  style?: BorderStyle,
  color?: string,
  lines?: number,
  withPadding?: true
): Object {
  if (withPadding && !lines) {
    throw new Error(
      'You must provide the "lines" argument to "border" functions so that vertical borders don\'t break the vertical rhythm'
    );
  }
  return sides.reduce(
    (styles, sideString) => ({
      ...styles,
      ...{ [`border${char0ToUpper(sideString)}Width`]: width, },
      ...(style
        ? { [`border${char0ToUpper(sideString)}Style`]: style, }
        : undefined),
      ...(color
        ? { [`border${char0ToUpper(sideString)}Color`]: color, }
        : undefined),
      ...(withPadding && lines
        ? {
          [`padding${char0ToUpper(
            sideString
          )}`]: `calc(${lines}rem - ${width})`,
        }
        : undefined),
    }),
    {}
  );
}

function getSides(
  side: BorderSide
): { verticalSides?: string[], horizontalSides?: string[] } {
  if (side === 'all') {
    return {
      verticalSides: [ 'top', 'bottom', ],
      horizontalSides: [ 'InlineEnd', 'InlineStart', ],
    };
  }
  if (side === 'horizontal') {
    return {
      verticalSides: undefined,
      horizontalSides: [ 'inlineEnd', 'inlineStart', ],
    };
  }
  if (side === 'vertical') {
    return { verticalSides: [ 'top', 'bottom', ], horizontalSides: undefined, };
  }
  if ([ 'start', 'end', ].includes(side)) {
    return {
      verticalSides: undefined,
      horizontalSides: [ `Inline${char0ToUpper(side)}`, ],
    };
  }
  if ([ 'top', 'bottom', ].includes(side)) {
    return { verticalSides: [ side, ], horizontalSides: undefined, };
  }
  return { verticalSides: undefined, horizontalSides: [ side, ], };
}

function char0ToUpper(side: string): string {
  return side.charAt(0).toUpperCase() + side.slice(1);
}
