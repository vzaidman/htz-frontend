// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';
import { teaserForGamal, } from '@haaretz/app-utils';

export default gql`
  query GamalQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      title
      url
      urlDescription
      items {
        ... on TeaserInList {
          ...TeaserForGamal
        }
        ... on ClickTrackerBannersWrapper {
          ...ClickTrackerBannersWrapper
        }
      }
    }
  }
  ${teaserForGamal}
`;
