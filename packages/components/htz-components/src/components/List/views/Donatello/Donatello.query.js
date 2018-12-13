import gql from 'graphql-tag';
import { clickTrackerBannersWrapper, } from '@haaretz/app-utils';

export default gql`
  query DonatelloQuery($listId: String!, $history: [ID]) {
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
