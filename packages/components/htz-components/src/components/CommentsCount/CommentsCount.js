import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { parseComponentProp, parseStyleProps, } from '@haaretz/htz-css-tools';
import { stylesPropType, } from '../../propTypes/stylesPropType';
import setColor from '../../utils/setColor';
import IconComment from '../Icon/icons/IconComment';

CommentsCount.propTypes = {
  /**
  * Can be a the fontSize number in rem's, or a responsive array of values
  * parsed by parseComponentProp
  */
  size: PropTypes.oneOfType([ PropTypes.number, PropTypes.array, ]),
  /* pass commnets count from polopoly if exists */
  commentsCount: PropTypes.number,
  /* icon and text color */
  iconColor: PropTypes.arrayOf(PropTypes.string),
  /**
   * A special property holding miscellaneous CSS values that
   * trump all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
  iconMiscStyles: stylesPropType,
  textMiscStyles: stylesPropType,
};

CommentsCount.defaultProps = {
  size: 2,
  commentsCount: null,
  iconColor: [ 'primary', ],
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

const commentCountTextStyle = ({ size, iconColor, theme, textMiscStyles, }) => ({
  fontWeight: 'bold',
  paddingInlineEnd: '0.5rem',
  extend: [
    iconColor
      ? parseComponentProp('color', iconColor, theme.mq, setColor, theme.color)
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

function CommentsCount({ size, iconColor, commentsCount, miscStyles, iconMiscStyles, textMiscStyles, }) {
  return (
    <FelaComponent
      miscStyles={miscStyles}
      rule={wrapperStyle}
      render={({ theme, className, }) => (
        <span className={className}>
          { commentsCount
            ? (
              <FelaComponent
                iconColor={iconColor}
                size={size}
                textMiscStyles={textMiscStyles}
                rule={commentCountTextStyle}
                render={({ theme, className, }) => (
                  <div className={className}>
                    {commentsCount}
                  </div>
                )}
              />
            ) : null }
          <IconComment color={iconColor} size={size} miscStyles={iconMiscStyles} />
        </span>
      )}
    />
  );
}

export default CommentsCount;
