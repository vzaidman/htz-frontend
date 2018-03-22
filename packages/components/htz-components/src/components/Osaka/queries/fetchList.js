// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

export default gql`
  query OsakaListQuery($path: String!) {
    osakaList(path: $path) {
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
