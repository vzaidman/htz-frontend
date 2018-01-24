// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

export default gql`
  mutation AddComment(
    $commentElementId: ID!
    $parentCommentId: String!
    $articleId: String!
    $commentText: String!
    $commentAuthor: String!
  ) {
    addComment(
      newComment: {
        commentElementId: $commentElementId
        parentCommentId: $parentCommentId
        articleId: $articleId
        commentAuthor: $commentAuthor
        commentText: $commentText
      }
    ) {
      newCommentId
      hash
    }
  }
`;
