/* eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved */
import gql from 'graphql-tag';
import { dfpBanner, imagesInTeaser, } from '@haaretz/app-utils';

export default gql`
  query ZombieQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      title
      url
      extraLinks {
        contentId
        contentName
        href
        inputTemplate
        linkText
        toolTip
      }
      items {
        ... on TeaserInList {
          ...ImagesInTeaser
          contentId
          representedContent
          exclusive
          exclusiveMobile
          title
          path
          titleMobile
          commentsCounts
          lastUpdate
          inputTemplate
          authors {
            ... on Author {
              contentName
            }
          }
        }
      }
      dfp: items {
        ... on DfpBanner {
          ...DfpBanner
        }
      }
    }
  }
  ${imagesInTeaser}
  ${dfpBanner}
`;
