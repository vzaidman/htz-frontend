// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';
import tag from '../tag/tag';

export default gql`
  fragment Tags on Tags {
    kind
    tagsList {
      ...Tag
    }
  }
  ${tag}
`;
