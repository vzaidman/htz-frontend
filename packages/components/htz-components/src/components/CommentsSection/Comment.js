import React from 'react';
import PropTypes from 'prop-types';
import { borderBottom, getRemFromPx, } from '@haaretz/htz-css-tools';
import { createComponent, withTheme, } from 'react-fela';
import Button from '../Button/Button'; // eslint-disable-line import/no-named-as-default
import CommentList from './CommentList.js'; // eslint-disable-line import/no-named-as-default
import CommentForm from './CommentForm';
import IconArrow from '../Icon/icons/IconArrow';
import IconReply from '../Icon/icons/IconReply';
import Like from './Like'; // eslint-disable-line import/no-named-as-default

const wrapperStyle = ({ theme, isSubComment, isLastSubComment, bgColor, }) => ({
  backgroundColor: bgColor,
  extend: [
    {
      condition: isSubComment === false,
      style: borderBottom('1px', 2, 'solid', theme.color('comments', 'border')),
    },
    {
      condition: isSubComment && !isLastSubComment,
      style: borderBottom('1px', 2, 'solid', theme.color('comments', 'subcommentBorder')),
    },
  ],
});

const StyledWrapper = createComponent(wrapperStyle, 'section');

const commentWrapperStyle = ({ theme, }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  paddingInlineStart: '1rem',
  paddingInlineEnd: '1rem',
  paddingTop: '2rem',
});

const StyledCommentWrapper = createComponent(commentWrapperStyle);

const commentNumberContainerStyle = ({ theme, }) => ({
  width: '8.5rem',
  color: theme.color('comments', 'number'),
  flexShrink: '0',
  flexGrow: '0',
  ...theme.type(3),
});

const StyledCommentNumberContainer = createComponent(commentNumberContainerStyle);

const commentContainerStyle = () => ({
  width: '100%',
  flexShrink: '1',
  flexGrow: '1',
  minWidth: '0',
});

const StyledCommentContainer = createComponent(commentContainerStyle);

const CommentHeaderCont = ({ theme, truncate, }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  ...(truncate ? {} : { flexWrap: 'wrap', }),
  ...theme.mq({ until: 's', }, { flexWrap: 'wrap', }),
});

const StyledCommentHeaderCont = createComponent(CommentHeaderCont);

const CommentAuthorStyle = ({ theme, truncate, }) => ({
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
});

const StyledCommentAuthor = createComponent(CommentAuthorStyle, 'h4', [ 'onClick', ]);

const PublishingDateStyle = ({ theme, }) => ({
  color: theme.color('comments', 'date'),
  ...theme.type(-1),
  marginInlineEnd: '1rem',
  marginInlineStart: '1rem',
});

const StyledPublishingDate = createComponent(PublishingDateStyle, 'span');

const subCommentAuthorStyle = ({ theme, }) => ({
  color: theme.color('comments', 'subcommentAuthor'),
  fontStyle: 'italic',
});

const StyledSubCommentAuthor = createComponent(subCommentAuthorStyle, 'span');

const editorPickTagStyle = ({ theme, }) => ({
  color: theme.color('comments', 'highlightStatus'),
  whiteSpace: 'nowrap',
});

const StyledEditorPickTag = createComponent(editorPickTagStyle, 'span');

const commentTextStyle = ({ theme, fade, }) => ({
  color: theme.color('comments', 'text'),
  margin: 0,
  ...(fade
    ? {
      overflow: 'hidden',
      maxHeight: '41rem',
    }
    : {}),
});

const StyledCommentText = createComponent(commentTextStyle, 'div', [
  'dangerouslySetInnerHTML',
  'innerRef',
]);

const fadeStyle = ({ theme, bgColor, }) => ({
  display: 'block',
  height: 0,
  ':after': {
    display: 'block',
    content: '""',
    width: '100%',
    height: '14rem',
    position: 'relative',
    top: '-14rem',
    background: `linear-gradient(transparent, ${bgColor})`,
  },
});

const Fade = createComponent(fadeStyle, 'span');

const commentFooterStyle = () => ({
  display: 'flex',
  flexDirection: 'row',
  alignContent: 'flex-start',
  alignItems: 'center',
  marginTop: '2rem',
});

const StyledCommentFooter = createComponent(commentFooterStyle);

const likeMiscStyles = {
  marginInlineStart: 'auto',
  display: [ { until: 's', value: 'none', }, ],
};
const disLikeMiscStyles = {
  marginInlineEnd: '4rem',
  display: [ { until: 's', value: 'none', }, ],
};

class Comment extends React.Component {
  static propTypes = {
    /** The Comment author */
    author: PropTypes.string.isRequired,
    /** The Comment ID */
    commentId: PropTypes.string.isRequired,
    /** The Comment Number */
    commentNumber: PropTypes.oneOfType([ PropTypes.number, PropTypes.string, ]).isRequired,
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
     * @param {String} commentAuthor - the new comment author
     * @param {String} commentTextHtml - the new comment text innerHTML
     * @param {String} parentCommentId - the parent CommentId - defaults to '0' if there is no `parentCommentId`
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
    /** passed as a a prop by fela's withTheme func before default export */
    theme: PropTypes.shape({
      color: PropTypes.func.isRequired,
      bps: PropTypes.object.isRequired,
      typeConf: PropTypes.object.isRequired,
      mq: PropTypes.func.isRequired,
    }).isRequired,
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
    displayReplyForm: false,
    fadeText: false,
    truncateAuthorName: true,
  };

  componentDidMount() {
    const height = this.commentTextEl.clientHeight;
    const remHeight = getRemFromPx(this.props.theme.bps, this.props.theme.typeConf, height);
    if (remHeight > 42) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ fadeText: true, });
    }
  }

  commentPlusRate = Object.prototype.hasOwnProperty.call(
    this.props.commentsPlusRate,
    this.props.commentId
  )
    ? this.props.commentsPlusRate[this.props.commentId]
    : 0;
  commentMinusRate = Object.prototype.hasOwnProperty.call(
    this.props.commentsMinusRate,
    this.props.commentId
  )
    ? this.props.commentsMinusRate[this.props.commentId]
    : 0;
  isUsersChoice = this.commentPlusRate - this.commentMinusRate > 10;

  bgColor = this.props.isEditorPick === 'true' || this.isUsersChoice
    ? this.props.theme.color('comments', 'highlightedCommentBg')
    : this.props.theme.color('comments', 'bg');
  handleReplyClick = () => {
    this.state.displayReplyForm
      ? this.setState({ displayReplyForm: false, })
      : this.props.isSubComment
        ? this.props.openParentReplyForm()
        : this.setState({ displayReplyForm: true, });
  };

  generateCommentMarkup() {
    return { __html: this.props.commentText, };
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
      theme,
    } = this.props;

    const {
      tags: { editorsPick, usersPick, },
      buttons: { replyBtnTxt, readMoreBtnTxt, reportAbuseBtnTxt, },
    } = theme.commentI18n;
    return (
      <StyledWrapper
        isSubComment={isSubComment}
        isLastSubComment={isLastSubComment}
        bgColor={this.bgColor}
      >
        <StyledCommentWrapper>
          <StyledCommentNumberContainer>
            <span>
              {isSubComment ? (
                isFirstSubComment ? (
                  <IconReply color={[ 'comments', 'replyIcon', ]} />
                ) : (
                  ''
                )
              ) : (
                commentNumber
              )}
            </span>
          </StyledCommentNumberContainer>
          <StyledCommentContainer>
            <StyledCommentHeaderCont truncate={this.state.truncateAuthorName}>
              <StyledCommentAuthor
                truncate={this.state.truncateAuthorName}
                data-test="comment-author"
                onClick={() =>
                  this.setState((prevState, props) => ({
                    truncateAuthorName: !prevState.truncateAuthorName,
                  }))
                }
              >
                {author}
              </StyledCommentAuthor>

              <StyledPublishingDate>{publishingDateForDisplay}</StyledPublishingDate>

              {isSubComment ? (
                <StyledSubCommentAuthor>
                  <IconArrow /> {parentAuthor}
                </StyledSubCommentAuthor>
              ) : (
                undefined
              )}
              {isEditorPick === 'true' ? (
                <StyledEditorPickTag>| {editorsPick}</StyledEditorPickTag>
              ) : (
                undefined
              )}
              {this.isUsersChoice ? (
                <StyledEditorPickTag>| {usersPick}</StyledEditorPickTag>
              ) : (
                undefined
              )}
            </StyledCommentHeaderCont>
            <div>
              <StyledCommentText>{title}</StyledCommentText>
              <StyledCommentText
                // eslint-disable-next-line
                innerRef={commentTextEl => (this.commentTextEl = commentTextEl)}
                dangerouslySetInnerHTML={this.generateCommentMarkup()}
                fade={this.state.fadeText}
              />
              {this.state.fadeText ? <Fade bgColor={this.bgColor} /> : null}
            </div>
            <StyledCommentFooter>
              <Button
                miscStyles={{
                  backgroundColor: 'transparent',
                  marginInlineEnd: '2rem',
                  type: [ { value: 0, }, ],
                }}
                boxModel={{ hp: 4, vp: 0.5, }}
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
                  boxModel={{ hp: 4, vp: 0.5, }}
                  onClick={() => this.setState({ fadeText: false, })}
                >
                  {readMoreBtnTxt}
                </Button>
              ) : null}

              <Like
                miscStyles={likeMiscStyles}
                initVote={initVote}
                rate={this.commentPlusRate}
                commentId={commentId}
              />
              <Like
                miscStyles={disLikeMiscStyles}
                initVote={initVote}
                rate={this.commentMinusRate}
                isDisLike
                commentId={commentId}
              />
              <Button
                isFlat
                variant="negative"
                boxModel={{ hp: 2, vp: 0.5, }}
                miscStyles={{ backgroundColor: 'transparent', type: [ { value: -2, }, ], }}
                onClick={() => {
                  reportAbuse(commentId);
                }}
              >
                {reportAbuseBtnTxt}
              </Button>
            </StyledCommentFooter>
            {subComments ? (
              <CommentList
                comments={subComments}
                parentAuthor={author}
                isSubComment
                initVote={initVote}
                commentsPlusRate={commentsPlusRate}
                commentsMinusRate={commentsMinusRate}
                reportAbuse={reportAbuse}
                openParentReplyForm={() => this.setState({ displayReplyForm: true, })}
              />
            ) : null}
          </StyledCommentContainer>
        </StyledCommentWrapper>
        {this.state.displayReplyForm ? (
          <CommentForm
            parentCommentId={commentId}
            initNewComment={initNewComment}
            signUpNotification={signUpNotification}
            closeReplyForm={() => this.setState({ displayReplyForm: false, })}
          />
        ) : null}
      </StyledWrapper>
    );
  }
}

export default withTheme(Comment);
