// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

export default gql`
  fragment HtmlElement on HtmlElement {
    code
    hideOnSite
    contentId
    contentName
    inputTemplate
  }
`;
