import gql from 'graphql-tag';

export default gql`
  query HomePageLayout {
    homePage {
      lineage {
        contentId
        name
        pathSegment
        url
        __typename
      }
      slots {
        preHeader
        header
        postHeader
        postMain
        footer
        main {
          ... on HomePageMainBlock {
            contentId
            contentName
            slotA {
              view
              contentId
            }
            slotC {
              view
              contentId
            }
          }
          ... on ListInit {
            contentId
            contentName
            inputTemplate
            view
          }
          ... on GridElementGroup {
            contentId
            items {
              ... on ClickTrackerBannersWrapper {
                contentId
                totalPercentage
              }
            }
          }
          ... on ElementGroup {
            contentId
          }
          ... on TabViewElements {
            contentId
          }
          ... on DfpBanner {
            contentId
          }
          ... on ClickTrackerBannersWrapper {
            contentId
          }
        }
      }
    }
  }
`;
