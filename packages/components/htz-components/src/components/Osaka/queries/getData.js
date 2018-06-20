// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

export default gql`
  query OsakaQuery($path: String!) {
    list(path: $path) {
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
    canonicalUrl @client
    section @client
  }
`;
