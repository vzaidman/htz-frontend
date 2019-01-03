import gql from 'graphql-tag';
import {
  imageInTeaser,
  clickTrackerBannersWrapper,
  dfpBanner,
  elementGroup,
  embed,
  image,
  imageGallery,
  gridElementGroup,
  tabViewElements,
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
              items {
                ...ItemInList
              }
            }
            slotB {
              ...DfpBanner
            }
            slotC {
              view
              inputTemplate
              loadPriority
              isLazyloadImages
              title
              contentId
              items {
                ...ItemInList
              }
            }
          }
          ... on List {
            ...HomePageList
          }
          ... on DfpBanner {
            ...DfpBanner
          }
          ... on ElementGroup {
            ...ElementGroup
          }
          ... on ClickTrackerBannersWrapper {
            ...ClickTrackerBannersWrapper
          }
          ... on GridElementGroup {
            ...GridElementGroup
          }
          ... on TabViewElements {
            ...TabViewElements
          }
        }
      }
    }
  }
  
  fragment ItemInList on TeaserInList {
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
  
  fragment HomePageList on List {
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
      ...ItemInList
    }
    clickTrackers {
      ...ClickTrackerBannersWrapper
    }
    dfp {
      ...DfpBanner
    }
  }
  
  ${clickTrackerBannersWrapper}
  ${dfpBanner}
  ${elementGroup}
  ${imageInTeaser}
  ${embed}
  ${image}
  ${imageGallery}
  ${gridElementGroup}
  ${tabViewElements}
`;
