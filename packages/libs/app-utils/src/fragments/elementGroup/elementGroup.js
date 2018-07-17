// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

export default gql`
  fragment ElementGroup on ElementGroup {
    contentLists
    hideOnSite
    inputTemplate
    contentName
    contentId
  }
`;
