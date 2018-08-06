// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

export default gql`
  query OsakaQuery($path: String!) {
    canonicalUrl @client
    articleParent @client {
      name
      id
      url
    }
    hostname @client
  }
`;
