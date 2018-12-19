import gql from 'graphql-tag';
import {
  imageInTeaser,
  imageGallery,
  image,
} from '@haaretz/app-utils';

export default gql`
  query SlimQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      items {
        ... on TeaserInList {
          ...ImageInTeaser
          media{
            ... on ImageGallery {
              ...ImageGallery
            }
          }
          contentId
          title
          path
          titleMobile
          inputTemplate
        }
      }
    }
  }
  ${imageInTeaser}
  ${image}
  ${imageGallery}
`;
