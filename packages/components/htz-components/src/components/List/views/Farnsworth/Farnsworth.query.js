/* eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved */
import gql from 'graphql-tag';
import { teaserForLeftElement, } from '@haaretz/app-utils';

export default gql`
  query FarnsworthQuery($path: String!) {
    list(path: $path) {
      title
      items {
        ... on TeaserInList {
          ...TeaserForLeftElement
        }
      }
    }
  }
  ${teaserForLeftElement}
`;
