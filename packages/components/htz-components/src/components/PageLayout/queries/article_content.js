import gql from 'graphql-tag';

export default gql`
  query PageData($path: String!) {
    page(path: $path) {
      pageType
      contentId
      contentName
      seoData {
        metaTitle
        metaDescription
        metaKeywords
        canonicalLink
        ogImages
        obTitle
      }
      slots {
        ... on StandardArticleSlots {
          aside
          article
        }
      }
    }
  }
`;
