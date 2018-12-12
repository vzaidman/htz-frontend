// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';
import { image, embed, imageGallery, } from '@haaretz/app-utils';

export default gql`
  query WongQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      items {
        ... on TeaserInList {
          commentsCounts
          contentId
          title
          titleMobile
          subtitle
          subtitleMobile
          exclusive
          exclusiveMobile
          path
          publishDate
          lastUpdate
          relatedArticles {
            title
            path
            contentId
          }
          authors {
            ... on AuthorObject {
              name
            }
            ... on CreditObject {
              name
            }
          }
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
