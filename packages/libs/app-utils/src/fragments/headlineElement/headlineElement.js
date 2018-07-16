// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

import embed from '../embed/embed';
import htmlElement from '../htmlElement/htmlElement';
import image from '../image/image';
import imageGallery from '../imageGallery/imageGallery';
import video from '../video/video';

export default gql`
  fragment HeadlineElement on HeadlineElement {
   
        ... on Embed {
          ...Embed
        }
        ... on HtmlElement {
          ...HtmlElement
        }
        ... on Image {
          ...Image
        }
        ... on ImageGallery {
          ...ImageGallery
        }
        ... on Video {
          ...Video
        }
    
  }
  ${embed}
  ${htmlElement}
  ${image}
  ${imageGallery}
  ${video}
`;
