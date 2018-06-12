import gql from 'graphql-tag';

export default gql`
  query PageLayout($path: String!) {
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
