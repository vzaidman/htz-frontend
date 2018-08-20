// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';
import { teaserForBender, } from '@haaretz/app-utils';

export default gql`
  query BenderQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      title
      items {
        ... on TeaserInList {
          ...TeaserForBender
        }
      }
    }
  }
  ${teaserForBender}
`;
