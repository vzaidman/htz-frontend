import gql from 'graphql-tag';

export default gql`
  query GetUserId {
    user @client {
      type
    }
  }
`;
