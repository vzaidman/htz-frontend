import gql from 'graphql-tag';
import { navMenu, } from '@haaretz/app-utils';

export default gql`
  query NavMenu($path: String!) {
    navMenu(path: $path) {
      ...NavMenu
    }
    hostname @client
  }
  ${navMenu}
`;
