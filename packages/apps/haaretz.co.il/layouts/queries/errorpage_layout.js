import gql from 'graphql-tag';

export default gql`
  query ErrorPageLayout {
    homePage {
      lineage {
        contentId
        name
        pathSegment
        url
      }
      slots {
        preHeader
        header
        postHeader
        postMain
        footer
      }
    }
  }
`;
