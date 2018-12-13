import gql from 'graphql-tag';
import { clickTrackerBannersWrapper, teaserForMom, } from '@haaretz/app-utils';

export default gql`
  query MomQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      title
      description
      url
      urlDescription
      items {
        ... on TeaserInList {
          ...TeaserForMom
        }
        ... on ClickTrackerBannersWrapper {
          ...ClickTrackerBannersWrapper
        }
        ... on DfpBanner {
          ...DfpBanner
        }
      }
    }
  }
  ${clickTrackerBannersWrapper}
  ${dfpBanner}
  ${teaserForMom}
`;
