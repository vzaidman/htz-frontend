import gql from 'graphql-tag';
import { breadcrumbs, } from '@haaretz/app-utils';

export default gql`
  query PageLayout($path: String!) {
    page(path: $path) {
      pageType
      ...PageBreadcrumbs
      pageDateTimeString
      slots {
        preHeader
        header
        postHeader
        postMain
        footer
        article {
          ... on ArticleData {
            authors {
              contentName
            }
            isPremiumContent
            isSuperContent
            inputTemplate
          }
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
      jsonld
    }
  }
  ${breadcrumbs}
`;
