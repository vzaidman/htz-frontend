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
      msg
    }
  }
`;

const SEND_MAIL_CONFIRMATION_REQUEST = gql`
  mutation sendEmailConfirmation(
    $email: String!
    $paramString: String!
    $url: String!
  ) {
    sendEmailConfirmation(
      email: $email
      paramString: $paramString
      url: $url
    ) {
      success
      message
    }
  }
`;

const CONFIRM_MAIL = gql`
  mutation ValidateEmail($email: String!, $confirmation: String!) {
    validateEmail(email: $email, confirmation: $confirmation) {
      success
      msg
    }
  }
`;

export {
  GENERATE_HASH,
  CONNECT_MAIL_MOBILE,
  VALIDATE_MAIL_TO_MOBILE,
  SEND_MAIL_CONFIRMATION_REQUEST,
  CONFIRM_MAIL,
};
