// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';
import { imageInTeaser, clickTrackerBannersWrapper, dfpBanner, } from '@haaretz/app-utils';

export default gql`
  query HawkingQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      title
      extraLinks {
        href
        contentName
        contentId
      }
      marketingTeaser {
        title
        subtitle
        href
        cta
      }
      items {
        ... on TeaserInList {
          contentId
          title
          titleMobile
          exclusive
          exclusiveMobile
          path
          commentsCounts
          publishDate
          inputTemplate
          ...ImageInTeaser
          authors {
            contentName
          }
        }
      }
      clickTrackers: items {
        ... on ClickTrackerBannersWrapper {
          ...ClickTrackerBannersWrapper
        }
      }
      dfp: items {
        ... on DfpBanner {
          ...DfpBanner
        }
      }
    }
  }
  ${imageInTeaser}
  ${clickTrackerBannersWrapper}
  ${dfpBanner}
`;
