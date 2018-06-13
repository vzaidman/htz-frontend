// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

export default gql`
  query {
    articleId @client
    commentsElementId @client
  }
`;
