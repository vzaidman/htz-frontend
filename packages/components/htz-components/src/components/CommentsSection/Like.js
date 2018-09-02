import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, } from '@haaretz/htz-css-tools';
import IconDislike from '../Icon/icons/IconDislike';
import IconLike from '../Icon/icons/IconLike';
import { stylesPropType, } from '../../propTypes/stylesPropType';
import AriaDescription from '../AriaDescription/AriaDescription';

const propTypes = {
  /**
   * used by initVote func to idenfy comment that is voted for
   */
  commentId: PropTypes.string.isRequired,
  /**
   * Insert a color from the htz-theme color pallete
   */
  iconColor: PropTypes.string,
  /**
   * A callaback that initiates a vote, `<Likes />` sends up the commentId and the rate ("plus"/"minus")
   */
  initVote: PropTypes.func.isRequired,
  /**
   * Is this a disLike (minus vote)
   */
  isDisLike: PropTypes.bool,
  /**
   * are the like buttons disabled
   */
  isDisabled: PropTypes.bool.isRequired,
  /** update parent component that the user clicked the like button */
  updateUserLike: PropTypes.func.isRequired,
  /**
   * A special property holding miscellaneous CSS values that
   * trump all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  // eslint-disable-next-line react/no-unused-prop-types
  miscStyles: stylesPropType,
  /**
   * number of votes
   */
  rate: PropTypes.number,
};

const defaultProps = {
  iconColor: 'primary',
  isDisLike: false,
  miscStyles: null,
  rate: 0,
};

const counterStyle = theme => ({
  color: theme.color('neutral', '-3'),
  verticalAlign: 'center',
  marginInlineStart: '1rem',
  fontWeight: 'bold',
  extend: [ theme.type(-2), ],
});

const styles = ({ theme, miscStyles, }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  marginInlineStart: '2rem',
  ':disabled': {
    cursor: 'default',
  },
  extend: [
    ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
  ],
});

export function Like({
  commentId,
  iconColor,
  initVote,
  isDisLike,
  isDisabled,
  miscStyles,
  updateUserLike,
  rate,
}) {
  function executeVote() {
    const likeSign = isDisLike ? 'minus' : 'plus';
    updateUserLike();
    initVote(commentId, likeSign);
  }
  // todo: get actual disabled color from designer
  const computedIconColor = isDisabled ? [ 'neutral', '-3', ] : iconColor;
  return (
    <FelaComponent
      miscStyles={miscStyles}
      rule={styles}
      render={({ className, theme: { commentsSectionI18n, }, }) => (
        <button
          className={className}
          type="button"
          onClick={() => executeVote()}
          disabled={isDisabled}
        >
          {isDisLike ? (
            <Fragment>
              <IconDislike size={3.5} color={computedIconColor} />
              <AriaDescription id="dislike">
                {commentsSectionI18n.likes.dislike}
              </AriaDescription>
            </Fragment>
          ) : (
            <Fragment>
              <IconLike size={3.5} color={computedIconColor} />
              <AriaDescription id="like">
                {commentsSectionI18n.likes.like}
              </AriaDescription>
            </Fragment>
          )}

          <FelaComponent style={counterStyle} render="span">
            {rate}
          </FelaComponent>
        </button>
      )}
    />
  );
}

Like.propTypes = propTypes;

Like.defaultProps = defaultProps;

export default Like;
