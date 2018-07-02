// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

export default gql`
  query GetIdsForComments {
    articleId @client
    commentsElementId @client
  }
`;
