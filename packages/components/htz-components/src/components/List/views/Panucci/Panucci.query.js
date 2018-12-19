/* eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved */
import gql from 'graphql-tag';
import { teaserForPanucci, link, } from '@haaretz/app-utils';

export default gql`
  query PanucciQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      title
      url
      extraLinks {
        ...Link
      }
      items {
        ... on TeaserInList {
          ...TeaserForPanucci
        }
      }
    }
  }
  ${teaserForPanucci}
  ${link}
`;
