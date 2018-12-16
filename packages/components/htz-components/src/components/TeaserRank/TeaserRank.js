// @flow

import {
  type ComponentPropResponsiveObject,
  type StyleProps,
  parseComponentProp,
  parseStyleProps,
} from '@haaretz/htz-css-tools';
import { FelaComponent, FelaTheme, } from 'react-fela';
import * as React from 'react';

import type { attrFlowType, } from '../../flowTypes/attrTypes';
import AriaDescription from '../AriaDescription/AriaDescription';
import IconStar from '../IconStar/IconStar';

type ColorPropType =
  | string
  | [string, ]
  | [string, string, ]
  | ComponentPropResponsiveObject<string | [string, ] | [string, string, ]>[];

type TeaserRankPropsType = {
  /**
   * attributes to be passed to the DOM element
   */
  attrs: ?attrFlowType,
  /** The Item's rank */
  rank: number,
  /* The maximal rank possible */
  maxRank: number,
  /** The color of an active star */
  enabledColor: ?ColorPropType,
  /** The color of an inactive star */
  disabledColor: ?ColorPropType,
  direction: "rtl" | "ltr",
  size: ?number | ComponentPropResponsiveObject<number>[],
  miscStyles: ?StyleProps,
};

TeaserRank.defaultProps = {
  attrs: null,
  enabledColor: [ 'primary', 'base', ],
  disabledColor: [ 'disabled', 'bg', ],
  maxRank: 5,
  direction: 'rtl',
  size: null,
  miscStyles: null,
};

export default function TeaserRank({
  rank,
  attrs,
  enabledColor,
  disabledColor,
  maxRank,
  direction,
  size,
  miscStyles,
}: TeaserRankPropsType): React.Node {
  if (typeof rank !== 'number') return null;

  const flooredRank = Math.floor(rank);
  const hasHalfRank = flooredRank < rank;
  const stars = Array(maxRank)
    .fill()
    .map((item, idx) => (
      <IconStar
        // There is nothing meaningful to assign to the key.
        // Index is stable in this case
        // eslint-disable-next-line react/no-array-index-key
        key={idx}
        size="inherit"
        rightColor={
          idx < flooredRank
          || (idx === flooredRank && hasHalfRank && direction === 'rtl')
            ? enabledColor
            : disabledColor
        }
        leftColor={
          idx < flooredRank
          || (idx === flooredRank && hasHalfRank && direction === 'ltr')
            ? enabledColor
            : disabledColor
        }
      />
    ));

  return (
    <FelaComponent
      size={size}
      miscStyles={miscStyles}
      rule={teaserRankStyle}
      render={({ className, }) => (
        <span className={className} {...attrs}>
          <span aria-hidden="true">{stars}</span>
          <FelaTheme
            render={theme => (theme.teaserI18n ? (
              <AriaDescription>
                {`${rank} ${theme.teaserI18n.ratingDescription}`}
              </AriaDescription>
            ) : null)
            }
          />
        </span>
      )}
    />
  );
}

// /////////////////////////////////////////////////////////////////////
//                               Style                                //
// /////////////////////////////////////////////////////////////////////

type TeaserRankStyleOpts = {
  size: ?number | ComponentPropResponsiveObject<number>[],
  miscStyles: StyleProps,
  theme: Object,
};
function teaserRankStyle({
  size,
  miscStyles,
  theme,
}: TeaserRankStyleOpts): Object {
  return {
    whiteSpace: 'nowrap',
    extend: [
      // Set the width and height of an icon. The svgs' "height" attribute is
      // set to 1em, and the "width" is set in ems based on the icon's aspect ratio.
      // "size" will set the "fontSize" of the icon to a number of vertical-rhythm units
      // and by so adjusting width and height in a manner that keeps the icon's aspect ratio.
      ...(size
        ? [ parseComponentProp('fontSize', size, theme.mq, setSize), ]
        : []),
      // Trump all other styles with those defined in `miscStyles`
      ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
    ],
  };
}

function setSize(prop: ?string, value: number): { fontSize: string, } {
  return { fontSize: `${value}rem`, };
}
