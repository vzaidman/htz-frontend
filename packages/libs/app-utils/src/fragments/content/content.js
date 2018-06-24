// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

export default gql`
  fragment Content on Content {
    contentId
    contentName
    inputTemplate
    properties
  }
`;
