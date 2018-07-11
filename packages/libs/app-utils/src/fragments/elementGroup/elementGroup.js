// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

import clickTrackerBannersWrapper from '../clickTrackerBannersWrapper/clickTrackerBannersWrapper';
import content from '../content/content';
import dfpBanner from '../dfpBanner/dfpBanner';
import list from '../list/list';

export default gql`
  fragment ElementGroup on ElementGroup {
    contentLists {
      displayDuration
      content {
        ... on Content {
          ...Content
        }
        ... on DfpBanner {
          ...DfpBanner
        }
        ... on ClickTrackerBannersWrapper {
          ...ClickTrackerBannersWrapper
        }
        ... on List {
          ...ListInGroup
        }
      }
    }
    hideOnSite
    inputTemplate
    contentName
    contentId
  }
  ${clickTrackerBannersWrapper}
  ${content}
  ${dfpBanner}
  ${list}
`;
