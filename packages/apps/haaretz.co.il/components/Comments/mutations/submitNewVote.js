// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

export default gql`
  mutation AddVote($articleId: String!, $commentId: ID!, $group: String!) {
    addVote(newVote: { articleId: $articleId, commentId: $commentId, group: $group }) {
      status
    }
  }
`;
