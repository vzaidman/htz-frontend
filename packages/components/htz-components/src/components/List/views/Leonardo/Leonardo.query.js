import gql from 'graphql-tag';
import { clickTrackerBannersWrapper, } from '@haaretz/app-utils';

export default gql`
  query LeonardoQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      items {
        ... on ClickTrackerBannersWrapper {
          ...ClickTrackerBannersWrapper
        }
      }
    }
  }
  ${clickTrackerBannersWrapper}
`;
