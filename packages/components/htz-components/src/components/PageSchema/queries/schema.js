import gql from 'graphql-tag';

export default gql`
  query GetSchema {
    pageSchema @client {
      type
      publisher {
        type
        name
        url
        sameAs
        logo {
          type
          image
          url
        }
      }
      mainEntityOfPage {
        type
        id
      }
      author {
        type
        name
        sameAs
      }
      headline
      description
      datePublished
      dateModified
      isAccessibleForFree
      hasPart {
        type
        isAccessibleForFree
        cssSelector
      }
      image {
        type
        url
        datePublished
        description
        name
        width
        height
      }
    }
  }
`;
