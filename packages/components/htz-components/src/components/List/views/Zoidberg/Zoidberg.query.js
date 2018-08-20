/* eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved */
import gql from 'graphql-tag';
import {
  clickTrackerBannersWrapper,
  dfpBanner,
  teaserForLeftElement,
} from '@haaretz/app-utils';

export default gql`
  query ZoidbergQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      title
      items {
        ... on TeaserInList {
          ...TeaserForLeftElement
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
  ${teaserForLeftElement}
`;
