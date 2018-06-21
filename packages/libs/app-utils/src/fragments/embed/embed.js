// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

export default gql`
  fragment Embed on Embed {
    source: content
    caption
    credit
    embedType
    elementType
    contentId
    contentName
    inputTemplate
    settings
  }
`;
