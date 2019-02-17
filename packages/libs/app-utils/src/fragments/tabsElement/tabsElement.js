// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

import clickTrackerBannersWrapper from '../clickTrackerBannersWrapper/clickTrackerBannersWrapper';
import dfpBanner from '../dfpBanner/dfpBanner';
import list from '../list/list';

export default gql`
  fragment TabViewElements on TabViewElements {
    inputTemplate
    contentId
    contentName
    title
    type
    viewMode
    loadPriority
    lazyloadDistance
    elements {
      ... on ClickTrackerBannersWrapper {
        ...ClickTrackerBannersWrapper
      }
      ... on DfpBanner {
        ...DfpBanner
      }
      ... on List {
        ...ListInGroup
      }
    }
  }
  ${clickTrackerBannersWrapper}
  ${dfpBanner}
  ${list}
`;
