// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';
import image from '../image/image';

export default gql`
  fragment ImageGallery on ImageGallery {
    images {
      ...Image
    }
    accessibility
    name
    showTitle
    contentId
    contentName
    inputTemplate
  }
  ${image}
`;
