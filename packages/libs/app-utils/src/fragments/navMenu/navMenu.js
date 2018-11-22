import gql from 'graphql-tag';

export default gql`
  fragment NavMenu on NavMenu {
    menu {
      promotions {
        name
        url
      }
      sites {
        name
        url
      }
      items {
        name
        url
        pages {
          name
          url
          contentId
          isCommercial
        }
      }
    }
  }
`;
