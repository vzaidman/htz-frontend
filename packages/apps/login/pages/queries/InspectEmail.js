import gql from 'graphql-tag';

export default gql`
  query GetEmailData($email: String!) {
    userByMail(id: $email) {
      ssoId
      userStatus {
      isEmailValidated
      isMobileValidated
      isPhoneEmailConn
      }
      userCrmStatus {
        isActiveTm
        isActiveHeb
        isActiveEng
      }
    }
  }
`;
