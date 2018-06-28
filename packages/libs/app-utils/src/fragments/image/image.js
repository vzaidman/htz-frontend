// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

const imageObj = `{
  inputTemplate
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
}`;

export const authorImage = gql`
    fragment AuthorImage on AuthorObject {
      image ${imageObj}
    }
  `;
export const clicktrackerImage = gql`
    fragment ClickTrackerImage on ClickTrackerBanner {
      clicktrackerimage ${imageObj}
    }
  `;
export const imagesInTeaser = gql`
    fragment ImagesInTeaser on TeaserInList {
      image ${imageObj}
      authorImage ${imageObj}
    }
  `;
export const headlineImage = gql`
  fragment HeadlineImage on HeaderData {
    image ${imageObj}
  }
`;
export const seoImage = gql`
  fragment SeoImage on SeoData {
    ogImage ${imageObj}
  }
`;
export const quoteImage = gql`
  fragment QuoteImage on Quote {
    imagesList ${imageObj}
  }
`;

export default gql`
  fragment Image on Image 
    ${imageObj}
`;
