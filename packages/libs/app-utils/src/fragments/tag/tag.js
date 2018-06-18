// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

export default gql`
  fragment Tag on Tag {
    url
    inputTemplate
    contentName
    contentId
  }
`;
