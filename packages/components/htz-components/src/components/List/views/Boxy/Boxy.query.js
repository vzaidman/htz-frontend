// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';
import { image, embed, imageGallery, } from '@haaretz/app-utils';

export default gql`
  query BoxyQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      title
      items {
        ... on TeaserInList {
          contentId
          title
          titleMobile
          path
          media {
            ... on Image {
              ...Image
            }
            ... on Embed {
              ...Embed
            }
            ... on ImageGallery {
                ...ImageGallery
            }
          }
        }
      }
    }
  }
  ${embed}
  ${image}
  ${imageGallery}
`;
