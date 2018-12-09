// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';
import { image, clickTrackerBannersWrapper, } from '@haaretz/app-utils';

export default gql`
  query ZappQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      items {
        ... on TeaserInList {
          inputTemplate
          commentsCounts
          contentId
          title
          titleMobile
          subtitle
          subtitleMobile
          exclusive
          exclusiveMobile
          path
          publishDate
          lastUpdate
          rank
          authors {
            contentName
          }
          image {
            ...Image
          }
        }
        ... on ClickTrackerBannersWrapper {
          ...ClickTrackerBannersWrapper
        }
      }
    }
  }
  ${image}
  ${clickTrackerBannersWrapper}
`;
