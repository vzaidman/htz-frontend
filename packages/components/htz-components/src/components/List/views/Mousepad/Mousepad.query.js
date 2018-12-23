/* eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved */
import gql from 'graphql-tag';

export default gql`
  query MousepadQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      items {
        ... on TeaserInList {
          contentId
          path
          representedContent
          commentsCounts
          exclusive
          exclusiveMobile
          title
          titleMobile
          inputTemplate
        }
      }
    }
  }
`;
