import gql from 'graphql-tag';

export default gql`
  fragment NewsLetter on NewsLetter {
    segmentId
    segmentName
    inputTemplate
    contentId
    contentName
  }
`;
