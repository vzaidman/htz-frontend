import gql from 'graphql-tag';

const GENERATE_HASH = gql`
  mutation GenerateHash($typeId: String!) {
    generateOtp(typeId: $typeId) {
      success
      msg
      hash
    }
  }
`;

const CONNECT_MAIL_MOBILE = gql`
  mutation ConnectMailMobile(
    $email: String!
    $phone: String!
    $userName: String!
    $paramString: String!
    $url: String!
  ) {
    sendMobileEmailConnection(
      email: $email
      phone: $phone
      userName: $userName
      paramString: $paramString
      url: $url
    ) {
      success
      message
    }
  }
`;

const VALIDATE_MAIL_TO_MOBILE = gql`
  mutation ValidateMailMobileConfirmation($email: String!, $confirmation: String!) {
    validateMobileEmailConnection(email: $email, confirmation: $confirmation) {
      success
      message
    }
  }
`;

const VALIDATE_MAIL = gql`
  mutation ValidateEmailConfirmation($email: String!, $confirmation: String!) {
    validateEmail(email: $email, confirmation: $confirmation) {
      success
      message
    }
  }
`;

export { GENERATE_HASH, CONNECT_MAIL_MOBILE, VALIDATE_MAIL_TO_MOBILE, VALIDATE_MAIL, };
