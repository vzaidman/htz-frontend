import gql from 'graphql-tag';

export default gql`
  query GetHost {
    hostname @client
    userFlowJson @client
  }
`;
