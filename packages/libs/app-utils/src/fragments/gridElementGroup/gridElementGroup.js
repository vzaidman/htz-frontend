import gql from 'graphql-tag';

import clickTrackerBannersWrapper from '../clickTrackerBannersWrapper/clickTrackerBannersWrapper';
import dfpBanner from '../dfpBanner/dfpBanner';

export default gql`
  fragment GridElementGroup on GridElementGroup {
    inputTemplate
    contentName
    contentId
    items {
      ... on ClickTrackerBannersWrapper {
        ...ClickTrackerBannersWrapper
      }
      ... on DfpBanner {
        ...DfpBanner
      }
    }
  }
  ${clickTrackerBannersWrapper}
  ${dfpBanner}
`;
