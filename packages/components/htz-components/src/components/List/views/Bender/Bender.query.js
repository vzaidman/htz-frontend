// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';
import { teaserForBender, } from '@haaretz/app-utils';

export default gql`
  query BenderQuery($path: String!) {
    list(path: $path) {
      title
      items {
        ... on TeaserInList {
          ...TeaserForBender
        }
      }
    }
  }
  ${teaserForBender}
`;
