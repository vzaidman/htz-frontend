// @flow
import * as React from 'react';
import { FelaComponent, } from 'react-fela';
import type { ComponentPropResponsiveObject, StyleProps, } from '@haaretz/htz-css-tools';
import { parseComponentProp, parseStyleProps, } from '@haaretz/htz-css-tools';
import setColor from '../../utils/setColor';
import IconComment from '../Icon/icons/IconComment';

type Props = {
  /* pass comments count from polopoly if exists */
  commentsCount?: ?number,
  /**
   * minimum number of comments, if commentsCount is less than this nothing will be shown
   */
  minCount: number,
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
  commentsCount: null,
  minCount: 5,
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

const commentCountTextStyle = ({ color, theme, textMiscStyles, }) => ({
  fontWeight: 'bold',
  paddingInlineEnd: '0.5rem',
  extend: [
    color
      ? parseComponentProp('color', color, theme.mq, setColor, theme.color)
      : { color: 'inherit', },
    // Trump all other styles with those defined in `textMiscStyles`
    ...(textMiscStyles ? parseStyleProps(textMiscStyles, theme.mq, theme.type) : []),
  ],
});

function CommentsCount({
  commentsCount,
  minCount,
  color,
  miscStyles,
  iconMiscStyles,
  textMiscStyles,
}: Props): React.Node {
  return (commentsCount && commentsCount >= minCount)
    ? (
      <FelaComponent
        miscStyles={miscStyles}
        rule={wrapperStyle}
        render={({ theme, className, }) => (
          <span className={className}>
            {commentsCount ? (
              <FelaComponent
                color={color}
                textMiscStyles={textMiscStyles}
                rule={commentCountTextStyle}
                render={({ theme, className, }) => <div className={className}>{commentsCount}</div>}
              />
            ) : null}
            <IconComment color={color} miscStyles={iconMiscStyles} />
          </span>
        )}
      />
    )
    : null;
}

export default CommentsCount;
