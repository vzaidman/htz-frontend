/* eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved */
import gql from 'graphql-tag';

export default gql`
  query ListQuery($path: String!) {
    list(path: $path) {
      title
      items {
        authors {
          ... on AuthorObject {
            contentName
            url
          }
          ... on CreditObject {
            name
          }
        }
        commentsCount
        path
        title
        titleMobile
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
      }
    }
  }
`;
