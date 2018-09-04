import gql from 'graphql-tag';

export default gql`
  query GetData($email: String!) {
    
    isEmailValid(email: $email) {
      success
      isEmailValid
    }
    
    isPhoneValid(email: $email) {
      success
      isPhoneValid
    }
    
    isPhoneConnectedWithEmail(email: $email) {
      success
      isPhoneConnectedWithEmail
    }
  }
`;
