import gql from 'graphql-tag';
import { breadcrumbs, } from '@haaretz/app-utils';

export default gql`
  query PageLayout($path: String!) {
    page(path: $path) {
      ...PageBreadcrumbs
      slots {
        ... on StandardArticleSlots {
          preHeader
          header
          postHeader
          postMain
          footer
        }
      }
      dfpConfig {
        adSlotConfig
        adManagerConfig {
          network
          adUnitBase
        }
        conflictManagementConfig
        impressionManagerConfig
        googleGlobalSettings {
          enableSingleRequest
          enableAsyncRendering
          breakpointType
        }
      }
    }
    hostname @client
    user @client {
      type
    }
  }
  ${breadcrumbs}
`;
