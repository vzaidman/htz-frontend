import gql from 'graphql-tag';

export default gql`
  query UserFlow {
    userFlowJson @client
  }
`;
