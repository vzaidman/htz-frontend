/* eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved */
import gql from 'graphql-tag';
import { teaserForLeftElement, } from '@haaretz/app-utils';

export default gql`
  query FarnsworthQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      title
      items {
        ... on TeaserInList {
          ...TeaserForLeftElement
        }
      }
    }
  }
  ${teaserForLeftElement}
`;
