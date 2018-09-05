import gql from 'graphql-tag';

export default gql`
  query GetEmailData($email: String!) {
    user(email: $email) {
      isUserExist
      isEmailValid
      isPhoneValid
      isPhoneConnectedWithEmail
      isUserPaying
    }
  }
`;
