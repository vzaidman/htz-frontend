import gql from 'graphql-tag';

export default gql`
  query PageData($path: String!) {
    page(path: $path) {
      lineage {
        pathSegment
        contentId
        name
        url
      }
      slots {
        ... on StandardArticleSlots {
          preHeader
          header
          postHeader
          postMain
          footer
          article
          aside
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
  }
`;
