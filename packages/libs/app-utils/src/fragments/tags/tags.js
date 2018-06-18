// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';
import tag from '../tag/tag';

export default gql`
  fragment Tags on Tags {
    elementType
    tagsList {
      ...Tag
    }
  }
  ${tag}
`;
