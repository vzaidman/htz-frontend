// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

export default gql`
  fragment Paragraph on Paragraph {
    attributes {
      key
      value
    }
    tag
    content
  }
`;
