// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

export default gql`
  query CommentListQuery($contentId: ID!) {
    commentsElement(contentId: $contentId) {
      comments {
        commentId
        author
        title
        commentText
        publishingDateForDisplay
        isEditorPick
        subComments {
          commentId
          author
          title
          commentText
          publishingDateForDisplay
          isEditorPick
        }
      }
      commentsPlusRate
      commentsMinusRate
    }
  }
`;
