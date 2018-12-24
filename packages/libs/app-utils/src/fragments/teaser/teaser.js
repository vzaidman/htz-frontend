// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';
import image, { imageInTeaser, imagesInTeaser, } from '../image/image';
import author from '../author/author';

export const teaserForRelatedArticles = gql`
  fragment TeaserForRelatedArticles on TeaserInList {
    title
    path
    inputTemplate
    authors {
      ...Author
    }
  }
  ${author}
`;

export const teaserForLeftElement = gql`
  fragment TeaserForLeftElement on TeaserInList {
    ...ImageInTeaser
    contentId
    representedContent
    title
    path
    inputTemplate
    titleMobile
    hash
  }
  ${imageInTeaser}
`;

export const teaserForBender = gql`
  fragment TeaserForBender on TeaserInList {
    ...ImagesInTeaser
    contentId
    representedContent
    title
    path
    inputTemplate
    titleMobile
    hash
    authors {
      ...Author
    }
  }
  ${author}
  ${imagesInTeaser}
`;

export const teaserForMom = gql`
  fragment TeaserForMom on TeaserInList {
    ...ImagesInTeaser
    contentId
    representedContent
    exclusive
    exclusiveMobile
    title
    path
    titleMobile
    commentsCounts
    inputTemplate
  }
  ${imagesInTeaser}
`;

export const teaserForGamal = gql`
  fragment TeaserForGamal on TeaserInList {
    ...ImageInTeaser
    contentId
    exclusive
    exclusiveMobile
    title
    titleMobile
    path
    inputTemplate
  }
  ${imageInTeaser}
`;

export const teaserForPanucci = gql`
  fragment TeaserForPanucci on TeaserInList {
    ...ImagesInTeaser
    inputTemplate
    contentId
    representedContent
    exclusive
    exclusiveMobile
    title
    titleMobile
    path
    publishDate
    commentsCounts
    authors {
        ...Author
    }
  }
  ${imagesInTeaser}
  ${author}
`;

export default gql`
  fragment Teaser on TeaserInList {
    ...ImagesInTeaser
    firstParagraph
    publishDate
    contentId
    exclusiveMobile
    title
    commentsCounts
    path
    subtitleMobile
    isPremiumContent
    lastUpdate
    subTitle
    representedContent
    mediaFlags {
      video
      html_embed
      gallery
    }
    exclusive
    titleMobile
    hash
    authors {
      ...Author
    }
    ...Image
    inputTemplate
  }
  ${author}
  ${imageInTeaser}
  ${imagesInTeaser}
  ${image}
`;
