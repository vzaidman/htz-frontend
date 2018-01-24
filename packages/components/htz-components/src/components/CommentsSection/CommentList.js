import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import Comment from './Comment.js';

const propTypes = {
  /**
   * An Array of comment objects
   */
  comments: PropTypes.arrayOf(PropTypes.object),
  /**
   * An Object holding the Plus Rates of all the comments in the `CommentsElement`.
   * The Object has an id key for each comment that has at least one Plus vote.
   * The corresponding value is the rate of Plus votes the comment has.
   */
  commentsMinusRate: PropTypes.shape({
    id: PropTypes.number,
  }),
  /**
   * An Object holding the Minus Rates of all the comments in the `CommentsElement`.
   * The Object has an id key for each comment that has at least one Minus vote.
   * The corresponding value is the total number of Minus votes the comment has.
   */
  commentsPlusRate: PropTypes.shape({
    id: PropTypes.number,
  }),
  /**
   * A callback passed on to the reply `<CommentForm />`
   * @param {String} commentAuthor - the new comment author
   * @param {String} commentTextHtml - the new comment text innerHTML
   * @param {String} parentCommentId - the parent CommentId - defaults to '0' if there is no `parentCommentId`
   */
  initNewComment: PropTypes.func,
  /**
   * A callaback that initiates a vote, `<Likes />` sends up the commentId and the rate ("plus"/"minus")
   */
  initVote: PropTypes.func.isRequired,
  /** True when a CommentList renders subComments */
  isSubComment: PropTypes.bool,
  /**
   * A callback that causes the parent `<Comment />` to open its reply `<CommentForm />`
   * Replying to comments can only go one level deep so when replying to subComments,
   * we are actually replying to the parent of the subComment
   */
  openParentReplyForm: PropTypes.func,
  /** The author of the parent comment, null if it is not a subComment list */
  parentAuthor: PropTypes.string,
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
};
const defaultProps = {
  comments: [],
  isSubComment: false,
  commentsPlusRate: {},
  commentsMinusRate: {},
  openParentReplyForm: undefined,
  parentAuthor: null,
  initNewComment: undefined,
  signUpNotification: undefined,
};

const wrapperStyle = ({ theme, }) => ({
  backgroundColor: theme.color('white'),
});

const StyledWrapper = createComponent(wrapperStyle);

export function CommentList({
  comments,
  isSubComment,
  commentsPlusRate,
  commentsMinusRate,
  initVote,
  reportAbuse,
  parentAuthor,
  initNewComment,
  signUpNotification,
  openParentReplyForm,
}) {
  return (
    <StyledWrapper>
      {comments.map((comment, idx) => (
        <Comment
          key={comment.commentId}
          commentId={comment.commentId}
          author={comment.author}
          title={comment.title}
          commentText={comment.commentText}
          parentAuthor={parentAuthor}
          publishingDateForDisplay={comment.publishingDateForDisplay}
          commentNumber={comment.number || ''}
          subComments={comment.subComments}
          isEditorPick={comment.isEditorPick}
          // need to pass these down in case subComments have plus or minus rates
          commentsPlusRate={commentsPlusRate}
          commentsMinusRate={commentsMinusRate}
          initVote={initVote}
          reportAbuse={reportAbuse}
          initNewComment={initNewComment}
          signUpNotification={signUpNotification}
          openParentReplyForm={openParentReplyForm}
          isSubComment={isSubComment}
          isFirstSubComment={isSubComment && idx === 0}
          isLastSubComment={isSubComment && idx === comments.length - 1}
        />
      ))}
    </StyledWrapper>
  );
}

CommentList.propTypes = propTypes;

CommentList.defaultProps = defaultProps;

export default CommentList;
