// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';
import clickTrackerBanner from '../clickTrackerBanner/clickTrackerBanner';

export default gql`
  fragment ClickTrackerBannersWrapper on ClickTrackerBannersWrapper {
    inputTemplate
    contentName
    contentId
    totalPercentage
    viewModes {
      viewModeHtzMobile
      viewModeTmMobile
      viewModeHtz
      viewModeJson
    }
    banners {
      ...ClickTrackerBanner
    }
  }
  ${clickTrackerBanner}
`;
