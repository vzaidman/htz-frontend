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
        canonicalUrl
        ogTitle
        ogImage {
          viewMode
          accessibility
          title
          credit
          aspects
          isAnimated
          contentId
          imgArray {
            imgName
            version
          }
          imageType
          contentName
        }
        ogDescription
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
