// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

export default gql`
  fragment TableScore on TableScore {
    inputTemplate
    tableType
    coastType
    league
    number
    isOpen
  }
`;
