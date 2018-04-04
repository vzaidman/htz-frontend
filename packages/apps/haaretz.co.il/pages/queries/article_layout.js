import gql from 'graphql-tag';

export default gql`
  query PageData($path: String!) {
    page(path: $path) {
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
