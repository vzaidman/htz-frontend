// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

export default gql`
  fragment ListInGroup on List {
    title
    contentName
    contentId
    inputTemplate
    hasPagination
    loadPriority
    lazyloadDistance
    view
  }
`;
