// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

export default gql`
  query ListQuery($path: String!) {
    list(path: $path) {
      title
      items {
        image {
          viewMode
          aspects
          accessibility
          title
          credit
          contentId
          isAnimated
          imgArray {
            imgName
            version
          }
          imageType
          contentName
        }
        contentId
        title
        path
        titleMobile
        hash
      }
    }
  }
`;
