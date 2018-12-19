// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';
import { image, } from '@haaretz/app-utils';

export default gql`
  query SlugsQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      title
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
          rank
          inputTemplate
          authors {
            ... on Author {
              contentName
            }
          }
          image {
            ...Image
          }
        }
      }
    }
  }
  ${image}
`;
