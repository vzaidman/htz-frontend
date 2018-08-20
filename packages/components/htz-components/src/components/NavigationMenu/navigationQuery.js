import gql from 'graphql-tag';
import { navMenu, } from '@haaretz/app-utils';

export default gql`
  query NavMenu($listId: String!) {
    navMenu(listId: $listId) {
      ...NavMenu
    }
  }
  ${navMenu}
`;
