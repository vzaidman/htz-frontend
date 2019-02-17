// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

import content from '../content/content';
import list from '../list/list';

export default gql`
  fragment ListInGroup on List {
    loadPriority
    lazyloadDistance
    lists {
      ... on Content {
        ...Content
      }
      ... on List {
        ...ListInGroup
      }
    }
  }
  ${content}
  ${list}
`;
