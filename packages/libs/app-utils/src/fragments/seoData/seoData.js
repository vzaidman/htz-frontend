// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';
import { seoImage, } from '../image/image';

export default gql`
  fragment PageSeoData on Page {
    seoData {
      metaTitle
      metaDescription
      metaKeywords
      canonicalUrl
      amphtml
      ...SeoImage
      ogTitle
      ogDescription
    }
  }
  ${seoImage}
`;
