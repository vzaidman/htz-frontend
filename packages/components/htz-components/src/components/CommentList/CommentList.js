import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import Comment from './Comment.js';

const propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
  isSubComment: PropTypes.bool,
  commentsPlusRate: PropTypes.shape({
    id: PropTypes.number,
  }),
  commentsMinusRate: PropTypes.shape({
    id: PropTypes.number,
  }),
};
const defaultProps = {
  comments: [],
  isSubComment: false,
  commentsPlusRate: {},
  commentsMinusRate: {},
};

const wrapperStyle = ({ theme, }) => ({
  backgroundColor: theme.color('white'),
});

const StyledWrapper = createComponent(wrapperStyle);

function CommentList({ comments, isSubComment, commentsPlusRate, commentsMinusRate, }) {
  return (
    <StyledWrapper>
      {comments.map((comment, idx) => (
        <Comment
          key={comment.commentId}
          commentId={comment.commentId}
          author={comment.author}
          title={comment.title}
          commentText={comment.commentText}
          publishingDateForDisplay={comment.publishingDateForDisplay}
          commentNumber={idx + 1}
          subComments={comment.subComments}
          isSubComment={isSubComment}
          isEditorPick={comment.isEditorPick}
          // need to pass these down in case subComments have plus or minus rates
          commentsPlusRate={commentsPlusRate}
          commentsMinusRate={commentsMinusRate}
        />
      ))}
    </StyledWrapper>
  );
}

CommentList.propTypes = propTypes;

CommentList.defaultProps = defaultProps;

export default CommentList;
