// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';
import { image, } from '@haaretz/app-utils';

export default gql`
  query PazuzuQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      items {
        ... on TeaserInList {
          rank
          commentsCounts
          contentId
          title
          titleMobile
          path
          publishDate
          lastUpdate
          authors {
            ... on AuthorObject {
              name
            }
            ... on CreditObject {
              name
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
