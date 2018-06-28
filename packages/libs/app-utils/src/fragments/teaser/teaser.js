// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';
import image, { imagesInTeaser, } from '../image/image';
import author from '../author/author';

export const teaserForRelatedArticles = gql`
  fragment TeaserForRelatedArticles on TeaserInList {
    title
    path
    authors {
      ... on CreditObject {
        ...CreditObj
      }
      ... on AuthorObject {
        ...AuthorObj
      }
    }
  }
  ${author.authorObj}
  ${author.creditObj}
`;

export const teaserForLeftElement = gql`
  fragment TeaserForLeftElement on TeaserInList {
    ...ImagesInTeaser
    contentId
    title
    path
    titleMobile
    hash
  }
  ${imagesInTeaser}
`;

export const teaserForBender = gql`
  fragment TeaserForBender on TeaserInList {
    ...ImagesInTeaser
    contentId
    title
    path
    titleMobile
    hash
    authors {
      ... on CreditObject {
        ...CreditObj
      }
      ... on AuthorObject {
        ...AuthorObj
      }
    }
  }
  ${author.authorObj}
  ${author.creditObj}
  ${imagesInTeaser}
`;

export default gql`
  fragment Teaser on TeaserInList {
    ...ImagesInTeaser
    firstParagraph
    publishDate
    contentId
    exclusiveMobile
    title
    commentsCount
    path
    subtitleMobile
    ...Teaser
    isPremiumContent
    lastUpdate
    subTitle
    mediaFlags {
      video
      html_embed
      gallery
    }
    exclusive
    titleMobile
    hash
    authors {
      ... on CreditObject {
        ...CreditObj
      }
      ... on AuthorObject {
        ...AuthorObj
      }
    }
    ...Image
  }
  ${author.authorObj}
  ${author.creditObj}
  ${imagesInTeaser}
  ${image}
`;
