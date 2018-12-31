import gql from 'graphql-tag';

import clickTrackerBannersWrapper from '../clickTrackerBannersWrapper/clickTrackerBannersWrapper';
import dfpBanner from '../dfpBanner/dfpBanner';
import list from '../list/list';
import tabViewElements from '../tabsElement/tabsElement';

export default gql`
  fragment GridElementGroup on GridElementGroup {
    inputTemplate
    contentName
    contentId
    title
    items {
      width {
        from
        until
        value
      }
      content {
        ... on ClickTrackerBannersWrapper {
          ...ClickTrackerBannersWrapper
        }
        ... on DfpBanner {
          ...DfpBanner
        }
        ... on List {
          ...ListInGroup
        }
        ... on TabViewElements {
          ...TabViewElements
        }
      }
    }
  }
  ${clickTrackerBannersWrapper}
  ${dfpBanner}
  ${list}
  ${tabViewElements}
`;
