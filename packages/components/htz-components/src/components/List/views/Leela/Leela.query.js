/* eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved */
import gql from 'graphql-tag';
import { clickTrackerBannersWrapper, } from '@haaretz/app-utils';

export default gql`
  query LeelaQuery($path: String!) {
    list(path: $path) {
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
