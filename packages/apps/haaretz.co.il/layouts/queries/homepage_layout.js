import gql from 'graphql-tag';
import {
  imageInTeaser,
  clickTrackerBannersWrapper,
  dfpBanner,
  elementGroup,
  embed,
  image,
  imageGallery,
} from '@haaretz/app-utils';

export default gql`
  query HomePageLayout {
    homePage {
      lineage {
        contentId
        name
        pathSegment
        url
      }
      slots {
        preHeader
        header
        postHeader
        postMain
        footer
        main {
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
              media {
                ... on Image {
                  ...Image
                }
                ... on Embed {
                  ...Embed
                }
                ... on ImageGallery {
                  ...ImageGallery
                }
              }
            }
            clickTrackers {
              ...ClickTrackerBannersWrapper
            }
            dfp {
              ...DfpBanner
            }
          }
          ... on DfpBanner {
            ...DfpBanner
          }
          ... on ElementGroup {
            ...ElementGroup
          }
          ... on TabViewElements {
            contentId
          }
          ... on ClickTrackerBannersWrapper {
            ...ClickTrackerBannersWrapper
          }
        }
      }
    }
  }
  ${clickTrackerBannersWrapper}
  ${dfpBanner}
  ${elementGroup}
  ${imageInTeaser}
  ${embed}
  ${image}
  ${imageGallery}
`;
