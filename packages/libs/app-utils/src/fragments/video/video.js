// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

export default gql`
  fragment Video on Video {
    videoType
    title
    credit
    contentId
    videoContent
    inputTemplate
  }
`;
