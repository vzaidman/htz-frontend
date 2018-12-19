import gql from 'graphql-tag';
import { clickTrackerBannersWrapper, } from '@haaretz/app-utils';

export default gql`
  query MichelangeloQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      title
      items {
        ... on ClickTrackerBannersWrapper {
          ...ClickTrackerBannersWrapper
        }
      }
    }
  }
  ${clickTrackerBannersWrapper}
`;
