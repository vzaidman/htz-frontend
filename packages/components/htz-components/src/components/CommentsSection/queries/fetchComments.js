// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

export default gql`
  query CommentListQuery($path: String!) {
    commentsElement(path: $path) {
      comments {
        commentId
        author
        title
        commentText
        publishingDateForDisplay
        publishingDateSortable
        isEditorPick
        subComments {
          commentId
          author
          title
          commentText
          publishingDateForDisplay
          publishingDateSortable
          isEditorPick
        }
      }
      commentsPlusRate
      commentsMinusRate
      totalHits
    }
  }
`;
