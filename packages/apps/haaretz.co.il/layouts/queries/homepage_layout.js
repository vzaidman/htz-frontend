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

const itemsObj = `
{
  contentId
  title
  titleMobile
  subtitle
  subtitleMobile
  exclusive
  exclusiveMobile
  path
  commentsCounts
  publishDate
  lastUpdate
  rank
  inputTemplate
  ...ImageInTeaser
  authors {
    contentName
  }
  relatedArticles {
    title
    path
    contentId
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
`;

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
          ... on HomePageMainBlock {
            contentId
            inputTemplate
            slotA {
              view
              inputTemplate
              loadPriority
              isLazyloadImages
              title
              contentId
              items ${itemsObj}
            }
            slotC {
              view
              inputTemplate
              loadPriority
              isLazyloadImages
              title
              contentId
              items ${itemsObj}
            }
          }
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
            items ${itemsObj}
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
