// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

export default gql`
  fragment Interactive on Interactive {
    kind
    contentId
    contentName
    inputTemplate
    properties
  }
`;
