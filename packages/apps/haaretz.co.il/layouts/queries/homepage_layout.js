import gql from 'graphql-tag';
import { imageInTeaser, clickTrackerBannersWrapper, dfpBanner, } from '@haaretz/app-utils';

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
          # ... on HomePageMainBlock {
          #   contentId
          #   contentName
          #   slotA {
          #     view
          #     contentId
          #   }
          #   slotC {
          #     view
          #     contentId
          #   }
          # }
          ... on List {
            view
            inputTemplate
            loadPriority
            isLazyloadImages
            title
            contentId
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
            # clickTrackers: items {
            #   ... on ClickTrackerBannersWrapper {
            #     contentId
            #   }
            # }
            # dfp: items {
            #   ... on DfpBanner {
            #     ...DfpBanner
            #   }
            # }
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
  ${imageInTeaser}
`;
// # ${dfpBanner}
// # ${clickTrackerBannersWrapper}
