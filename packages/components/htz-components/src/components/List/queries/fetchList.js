// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

export default gql`
  query ListQuery($path: String!) {
    list(path: $path) {
      title
      viewtype
      items {
        id
        path
        title
        image {
          alt
          path
        }
      }
    }
  }
`;
