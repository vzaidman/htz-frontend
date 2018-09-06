import gql from 'graphql-tag';

export default gql`
  query UserFlowNumber {
    userFlowNumber @client
  }
`;
