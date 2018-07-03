// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

export default gql`
  fragment PageBreadcrumbs on Page {
    lineage {
      contentId
      name
      pathSegment
      url
    }
  }
`;
