import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { borderBottom, getRemFromPx, visuallyHidden, } from '@haaretz/htz-css-tools';
import { FelaComponent, } from 'react-fela';
import Recaptcha from 'react-google-invisible-recaptcha';
import Button from '../Button/Button'; // eslint-disable-line import/no-named-as-default
import CommentList from './CommentList.js'; // eslint-disable-line import/no-named-as-default
import CommentForm from './CommentForm';
import IconArrow from '../Icon/icons/IconArrow';
import IconReply from '../Icon/icons/IconReply';
import Like from './Like'; // eslint-disable-line import/no-named-as-default
import H from '../AutoLevels/H';
import Section from '../AutoLevels/Section';

import decodeCommonHTMLEntities from '../../utils/decodeCommonHTMLEntities';

const wrapperStyle = ({
  theme,
  isSubComment,
  isLastSubComment,
  isHighlighted,
}) => ({
  backgroundColor: theme.color(
    'comments',
    isHighlighted ? 'highlightedCommentBg' : 'bg'
  ),
  extend: [
    {
      condition: isSubComment === false,
      style: borderBottom('1px', 2, 'solid', theme.color('comments', 'border')),
    },
    {
      condition: isSubComment && !isLastSubComment,
      style: borderBottom(
        '1px',
        2,
        'solid',
        theme.color('comments', 'subcommentBorder')
      ),
    },
  ],
});

const commentWrapperStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  paddingInlineStart: '1rem',
  paddingInlineEnd: '1rem',
  marginTop: '2rem',
};

const commentNumberContainerStyle = ({ theme, isSubComment, }) => ({
  width: isSubComment ? '6rem' : '8.5rem',
  color: theme.color('comments', 'number'),
  flexShrink: '0',
  flexGrow: '0',
  extend: [ theme.type(3), ],
});

const commentContainerStyle = {
  width: '100%',
  flexShrink: '1',
  flexGrow: '1',
  minWidth: '0',
};

const CommentHeaderContStyle = ({ theme, truncate, }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  ...(truncate ? {} : { flexWrap: 'wrap', }),
  extend: [ theme.mq({ until: 's', }, { flexWrap: 'wrap', }), ],
});

const AriaTextContStyle = visuallyHidden();

const AriaText = ({ children, }) => (
  <FelaComponent
    style={AriaTextContStyle}
    render={({ className, }) => (
      <span className={className}>{children}</span>
    )}
  />
);
AriaText.propTypes = { children: PropTypes.node.isRequired, };

// eslint-disable-next-line react/prop-types
const StyledCommentAuthor = ({ truncate, children, ...props }) => (
  <FelaComponent
    style={theme => ({
      color: theme.color('comments', 'authorName'),
      padding: '0',
      margin: '0',
      ':hover': {
        cursor: 'pointer',
      },
      ...(truncate
        ? {
          whiteSpace: 'nowrap',
          marginInlineEnd: '1rem',
          maxWidth: '50%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }
        : {}),
      ...theme.type(0),
    })}
    render={({ className, }) => (
      <H className={className} {...props}>
        {children}
      </H>
    )}
  />
);

const publishingDateStyle = theme => ({
  color: theme.color('comments', 'date'),
  marginInlineEnd: '1rem',
  marginInlineStart: '1rem',
  extend: [ theme.type(-1), ],
});

const subCommentAuthorStyle = theme => ({
  color: theme.color('comments', 'subcommentAuthor'),
  fontStyle: 'italic',
});

// eslint-disable-next-line react/prop-types
const StyledEditorPickTag = ({ children, }) => (
  <FelaComponent
    style={theme => ({
      color: theme.color('comments', 'highlightStatus'),
      whiteSpace: 'nowrap',
    })}
    render="span"
  >
    {children}
  </FelaComponent>
);

// eslint-disable-next-line react/prop-types
const StyledCommentText = ({ fade, children, ...props }) => (
  <FelaComponent
    style={theme => ({
      color: theme.color('comments', 'text'),
      margin: 0,
      wordBreak: 'break-word',
      ...(fade
        ? {
          overflow: 'hidden',
          maxHeight: '80rem',
        }
        : {}),
    })}
    render={({ className, }) => (
      <div className={className} {...props}>
        {children}
      </div>
    )}
  />
);

// eslint-disable-next-line react/prop-types
const Fade = ({ isHighlighted, children, }) => (
  <FelaComponent
    style={theme => ({
      display: 'block',
      height: 0,
      ':after': {
        display: 'block',
        content: '""',
        width: '100%',
        height: '14rem',
        position: 'relative',
        top: '-14rem',
        background: `linear-gradient(rgba(255,255,255, 0), ${theme.color(
          'comments',
          isHighlighted ? 'highlightedCommentBg' : 'bg'
        )})`,
      },
    })}
    render="span"
  >
    {children}
  </FelaComponent>
);

const commentFooterStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignContent: 'flex-start',
  alignItems: 'center',
  marginTop: '2rem',
};

const likeMiscStyles = {
  marginInlineStart: 'auto',
  display: [ { until: 's', value: 'none', }, ],
};
const disLikeMiscStyles = {
  marginInlineEnd: '2rem',
  display: [ { until: 's', value: 'none', }, ],
};

class Comment extends React.Component {
  static propTypes = {
    /** The Comment author */
    author: PropTypes.string.isRequired,
    /** the bps object from the theme */
    bps: PropTypes.shape({ width: PropTypes.object, }).isRequired,
    /** the typeConf object from the theme */
    typeConf: PropTypes.shape({
      default: PropTypes.object,
      xl: PropTypes.object,
    }).isRequired,
    /** The Comment ID */
    commentId: PropTypes.string.isRequired,
    /** The Comment Number */
    commentNumber: PropTypes.oneOfType([ PropTypes.number, PropTypes.string, ])
      .isRequired,
    /**
     * An Object holding the Minus Rates of all the comments in the `CommentsElement`.
     * The Object has an id key for each comment that has at least one Minus vote.
     * The corresponding value is the total number of Minus votes the comment has.
     * The entire object is passed since the comment might have subComments that
     * will need to check their own rate.
     */
    commentsMinusRate: PropTypes.shape({
      id: PropTypes.number,
    }),
    /**
     * An Object holding the Plus Rates of all the comments in the `CommentsElement`.
     * The Object has an id key for each comment that has at least one Plus vote.
     * The corresponding value is the rate of Plus votes the comment has.
     * The entire object is passed since the comment might have subComments that
     * will need to check their own rate.
     */
    commentsPlusRate: PropTypes.shape({
      id: PropTypes.number,
    }),
    /** The comment text */
    commentText: PropTypes.string,
    /**
     * A callback passed on to the reply `<CommentForm />`
     * @param {String} commentAuthor
     *   The new comment author
     * @param {String} commentTextHtml
     *   The new comment text innerHTML
     * @param {String} parentCommentId
     *   The parent CommentId - defaults to '0' if there is no `parentCommentId`
     */
    initNewComment: PropTypes.func,
    /**
     * A callaback that initiates a vote, `<Like />` sends up the commentId and the rate ("plus"/"minus")
     */
    initVote: PropTypes.func.isRequired,
    /**
     * Is this comment marked as an editors pick?
     * Notice this is a string that should be "true" or "false"
     * as a string and not as a boolean (database limitations).
     */
    isEditorPick: PropTypes.string,
    /** passed as true when the SubComment is the first in the `subComments` Array */
    isFirstSubComment: PropTypes.bool,
    /** passed as true when the SubComment is the last in the `subComments` Array */
    isLastSubComment: PropTypes.bool,
    /** True when the comment is a subComment */
    isSubComment: PropTypes.bool,
    /**
     * A callback that causes the parent `<Comment />` to open its reply `<CommentForm />`
     * Replying to comments can only go one level deep so when replying to subComments,
     * we are actually replying to the parent of the subComment
     */
    openParentReplyForm: PropTypes.func,
    /** The author of the parent comment, null if it is not a subComment */
    parentAuthor: PropTypes.string,
    /** The publishing date for display as recieved from data base */
    publishingDateForDisplay: PropTypes.string.isRequired,
    /**
     * A CallBack that sends up the the commentId in order to report the Comment as abusive
     * @param {String} commentId
     */
    reportAbuse: PropTypes.func.isRequired,
    /**
     * A callback that gets the called when submitting the sign up to notification form in `<CommentSent />`
     * @param {String} - notificationEmail - The email the user entered
     */
    signUpNotification: PropTypes.func,
    /**
     * A Array of `<Comment />`'s to be rendered as the subComments to this `<Comment/>`
     */
    subComments: PropTypes.arrayOf(PropTypes.object),
    /**
     * The `<Comment />` title
     */
    title: PropTypes.string,
  };

  static defaultProps = {
    commentsMinusRate: {},
    commentsPlusRate: {},
    commentText: '',
    initNewComment: undefined,
    isEditorPick: 'false',
    isFirstSubComment: false,
    isLastSubComment: false,
    isSubComment: false,
    openParentReplyForm: undefined,
    parentAuthor: null,
    signUpNotification: undefined,
    subComments: undefined,
    title: '',
  };

  state = {
    abuseReported: false,
    displayReplyForm: false,
    fadeText: false,
    truncateAuthorName: true,
    // can be plus or minus, will disable like buttons and increase like count
    userLike: null,
  };

  commentPlusRateDB = Object.prototype.hasOwnProperty.call(
    this.props.commentsPlusRate,
    this.props.commentId
  )
    ? this.props.commentsPlusRate[this.props.commentId]
    : 0;

  commentMinusRateDB = Object.prototype.hasOwnProperty.call(
    this.props.commentsMinusRate,
    this.props.commentId
  )
    ? this.props.commentsMinusRate[this.props.commentId]
    : 0;

  isUsersChoice = this.commentPlusRate - this.commentMinusRate > 10;

  componentDidMount() {
    const height = this.commentTextEl.clientHeight;
    const remHeight = getRemFromPx(this.props.bps, this.props.typeConf, height);
    if (remHeight > 80) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ fadeText: true, });
    }
  }

  componentDidUpdate = (prevProp, prevState) => {
    if (prevState.fadeText !== this.state.fadeText && !this.state.fadeText) {
      this.commentTextEl.tabIndex = '-1';
      this.commentTextEl.focus();
    }
  }

  handleReplyClick = () => {
    this.state.displayReplyForm
      ? this.setState({ displayReplyForm: false, })
      : this.props.isSubComment
        ? this.props.openParentReplyForm()
        : this.setState({ displayReplyForm: true, });
  };

  generateCommentMarkup() {
    return { __html: decodeCommonHTMLEntities(this.props.commentText), };
  }

  render() {
    const {
      author,
      commentId,
      commentsMinusRate,
      commentNumber,
      commentsPlusRate,
      isSubComment,
      initNewComment,
      initVote,
      isEditorPick,
      isFirstSubComment,
      isLastSubComment,
      parentAuthor,
      publishingDateForDisplay,
      reportAbuse,
      signUpNotification,
      subComments,
      title,
    } = this.props;

    const isHighlighted = this.props.isEditorPick === 'true' || this.isUsersChoice;
    const commentPlusRateUser = this.state.userLike === 'plus' ? 1 : 0;
    const commentPlusRate = this.commentPlusRateDB + commentPlusRateUser;
    const commentMinusRateUser = this.state.userLike === 'minus' ? 1 : 0;
    const commentMinusRate = this.commentMinusRateDB + commentMinusRateUser;
    return (
      <FelaComponent
        isSubComment={isSubComment}
        isLastSubComment={isLastSubComment}
        isHighlighted={isHighlighted}
        rule={wrapperStyle}
        render={({
          className,
          theme: {
            commentI18n: {
              tags: { editorsPick, usersPick, },
              buttons: { replyBtnTxt, readMoreBtnTxt, reportAbuseBtnTxt, },
              ariaTexts: { subCommentTxt, },
            },
          },
        }) => (
          <Section tagName="article" className={className}>
            <FelaComponent style={commentWrapperStyle}>
              <FelaComponent
                isSubComment={isSubComment}
                rule={commentNumberContainerStyle}
              >
                <span>
                  {isSubComment ? (
                    isFirstSubComment ? (
                      <Fragment>
                        <AriaText>{subCommentTxt}</AriaText>
                        <IconReply color={[ 'comments', 'replyIcon', ]} />
                      </Fragment>
                    ) : (
                      ''
                    )
                  ) : (
                    commentNumber
                  )}
                </span>
              </FelaComponent>
              <FelaComponent style={commentContainerStyle}>
                <FelaComponent
                  rule={CommentHeaderContStyle}
                  truncate={this.state.truncateAuthorName}
                >
                  <StyledCommentAuthor
                    truncate={this.state.truncateAuthorName}
                    data-test="comment-author"
                    onClick={() => this.setState((prevState, props) => ({
                      truncateAuthorName: !prevState.truncateAuthorName,
                    }))
                    }
                  >
                    {author}
                  </StyledCommentAuthor>

                  <FelaComponent style={publishingDateStyle} render="span">
                    {publishingDateForDisplay}
                  </FelaComponent>

                  {isSubComment ? (
                    <FelaComponent style={subCommentAuthorStyle} render="span">
                      <IconArrow />
                      {' '}
                      {parentAuthor}
                    </FelaComponent>
                  ) : (
                    undefined
                  )}
                  {isEditorPick === 'true' ? (
                    <StyledEditorPickTag>

|
                      {editorsPick}
                    </StyledEditorPickTag>
                  ) : (
                    undefined
                  )}
                  {this.isUsersChoice ? (
                    <StyledEditorPickTag>

|
                      {usersPick}
                    </StyledEditorPickTag>
                  ) : (
                    undefined
                  )}
                </FelaComponent>
                <div
                  // eslint-disable-next-line
                  ref={commentTextEl => (this.commentTextEl = commentTextEl)}>
                  <StyledCommentText>
                    {decodeCommonHTMLEntities(title)}
                  </StyledCommentText>
                  <StyledCommentText
                    dangerouslySetInnerHTML={this.generateCommentMarkup()}
                    fade={this.state.fadeText}
                  />
                  {this.state.fadeText ? (
                    <Fade isHighlighted={isHighlighted} />
                  ) : null}
                </div>
                <FelaComponent style={commentFooterStyle}>
                  <Button
                    miscStyles={{
                      backgroundColor: 'transparent',
                      marginInlineEnd: '2rem',
                      type: [ { value: 0, }, ],
                    }}
                    boxModel={{ hp: 2, vp: 0.5, }}
                    onClick={this.handleReplyClick}
                  >
                    {replyBtnTxt}
                  </Button>
                  {this.state.fadeText ? (
                    <Button
                      miscStyles={{
                        backgroundColor: 'transparent',
                        type: [ { value: 0, }, ],
                      }}
                      boxModel={{ hp: 2, vp: 0.5, }}
                      onClick={() => {
                        this.setState({ fadeText: false, });
                      }}
                    >
                      {readMoreBtnTxt}
                    </Button>
                  ) : null}

                  <Like
                    commentId={commentId}
                    initVote={initVote}
                    isDisabled={!!this.state.userLike}
                    miscStyles={likeMiscStyles}
                    rate={commentPlusRate}
                    updateUserLike={() => {
                      this.setState({ userLike: 'plus', });
                    }}
                  />
                  <Like
                    commentId={commentId}
                    initVote={initVote}
                    isDisabled={!!this.state.userLike}
                    isDisLike
                    miscStyles={disLikeMiscStyles}
                    rate={commentMinusRate}
                    updateUserLike={() => {
                      this.setState({ userLike: 'minus', });
                    }}
                  />
                  {!this.state.fadeText ? (
                    <Button
                      isFlat
                      variant="negative"
                      boxModel={{ hp: 2, vp: 0.5, }}
                      miscStyles={{
                        backgroundColor: 'transparent',
                        type: [ { value: -2, }, ],
                        marginInlineStart: [ { until: 's', value: 'auto', }, ],
                      }}
                      isDisabled={this.state.abuseReported}
                      onClick={() => {
                        reportAbuse(commentId);
                        this.setState({ abuseReported: true, });
                      }}
                    >
                      {reportAbuseBtnTxt}
                    </Button>
                  ) : null}
                </FelaComponent>
                {this.state.abuseReported ? (
                  <FelaComponent
                    style={{
                      marginTop: '1rem',
                      marginBottom: '1rem',
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Recaptcha
                      sitekey="6Lc6jzoUAAAAAPBTy6ppZ5Et2Yv8zivAiNY-l4ol"
                      onResolved={() => console.log('captcha resolved')}
                      badge="inline"
                    />
                  </FelaComponent>
                ) : null}
                {subComments ? (
                  <CommentList
                    comments={subComments}
                    parentAuthor={author}
                    isSubComment
                    initVote={initVote}
                    commentsPlusRate={commentsPlusRate}
                    commentsMinusRate={commentsMinusRate}
                    reportAbuse={reportAbuse}
                    openParentReplyForm={() => this.setState({ displayReplyForm: true, })
                    }
                  />
                ) : null}
              </FelaComponent>
            </FelaComponent>
            {this.state.displayReplyForm ? (
              <CommentForm
                parentCommentId={commentId}
                initNewComment={initNewComment}
                signUpNotification={signUpNotification}
                closeReplyForm={() => this.setState({ displayReplyForm: false, })
                }
              />
            ) : null}
          </Section>
        )}
      />
    );
  }
}

export default Comment;
