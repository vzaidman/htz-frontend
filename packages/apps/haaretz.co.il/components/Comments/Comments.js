import React from 'react';
import PropTypes from 'prop-types';
import { CommentList, } from '@haaretz/htz-components';
import { graphql, } from 'react-apollo';
import fetchCommentsQuery from './queries/fetchComments';

Comments.propTypes = {
  /**
   * Passed implicitly by Apollo, not directly as an attribute on the component
   */
  data: PropTypes.shape({
    /** Indicates data loading state */
    loading: PropTypes.bool,
    /** Indicates data error state */
    error: PropTypes.bool,
    /** Holds the comment element object with all the comment data */
    commentsElement: PropTypes.shape({
      comments: PropTypes.arrayOf(PropTypes.object),
      commentsPlusRate: PropTypes.object,
      commentsMinusRate: PropTypes.object,
    }),
  }).isRequired,
};

// Todo: guyk: I couldnt find a use for match, check if match prop is necessary or ever used, and where does it come from
function Comments({ data: { loading, error, commentsElement, }, match, }) {
  if (loading) {
    return <div>loading ...</div>;
  }
  if (error) {
    return <h1>ERROR</h1>;
  }
  return (
    <CommentList
      comments={commentsElement.comments}
      commentsPlusRate={commentsElement.commentsPlusRate}
      commentsMinusRate={commentsElement.commentsMinusRate}
    />
  );
}

const CommentsElement = graphql(fetchCommentsQuery, {
  options: props => ({
    variables: { contentId: props.contentId, },
  }),
})(Comments);

export default CommentsElement;
