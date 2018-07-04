// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

export default gql`
  fragment Link on Link {
    contentId
    contentName
    inputTemplate
    href
    toolTip
    linkText
  }
`;
