// @flow
import * as React from 'react';
import { FelaComponent, } from 'react-fela';
import type { ComponentPropResponsiveObject, StyleProps, } from '@haaretz/htz-css-tools';
import { parseComponentProp, parseStyleProps, } from '@haaretz/htz-css-tools';
import setColor from '../../utils/setColor';
import IconComment from '../Icon/icons/IconComment';

type Props = {
  /**
   * Can be a the fontSize number in rem's, or a responsive array of values
   * parsed by parseComponentProp
   */
  size: ?number | ComponentPropResponsiveObject<number>[],
  /* pass comments count from polopoly if exists */
  commentsCount?: ?number,
  /* icon and text color */
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
  iconMiscStyles: ?StyleProps,
  textMiscStyles: ?StyleProps,
};

CommentsCount.defaultProps = {
  size: 2,
  commentsCount: null,
  color: [ 'primary', ],
  miscStyles: null,
  iconMiscStyles: null,
  textMiscStyles: null,
};

const wrapperStyle = ({ miscStyles, theme, }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  extend: [
    // Trump all other styles with those defined in `miscStyles`
    ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
  ],
});

const commentCountTextStyle = ({ size, color, theme, textMiscStyles, }) => ({
  fontWeight: 'bold',
  paddingInlineEnd: '0.5rem',
  extend: [
    color
      ? parseComponentProp('color', color, theme.mq, setColor, theme.color)
      : { color: 'inherit', },
    parseComponentProp('size', size, theme.mq, setSize),
    // Trump all other styles with those defined in `textMiscStyles`
    ...(textMiscStyles ? parseStyleProps(textMiscStyles, theme.mq, theme.type) : []),
  ],
});

function setSize(size, value) {
  return {
    fontSize: `${value * 0.8455}rem`,
  };
}

function CommentsCount({
  size,
  color,
  commentsCount,
  miscStyles,
  iconMiscStyles,
  textMiscStyles,
}: Props): React.Node {
  return (
    <FelaComponent
      miscStyles={miscStyles}
      rule={wrapperStyle}
      render={({ theme, className, }) => (
        <span className={className}>
          {commentsCount ? (
            <FelaComponent
              color={color}
              size={size}
              textMiscStyles={textMiscStyles}
              rule={commentCountTextStyle}
              render={({ theme, className, }) => <div className={className}>{commentsCount}</div>}
            />
          ) : null}
          <IconComment color={color} size={size} miscStyles={iconMiscStyles} />
        </span>
      )}
    />
  );
}

export default CommentsCount;
