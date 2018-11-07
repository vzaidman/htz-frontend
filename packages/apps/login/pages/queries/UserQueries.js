import gql from 'graphql-tag';
export default gql`
  query GetEmailData($email: String!) {
    userByMail(id: $email) {
      ssoId
      firstName
      phoneNum
      userStatus {
        isEmailValidated
        isMobileValidated
        isPhoneEmailConn
      }
      userCrmStatus {
        id
        isActiveTm
        isActiveHeb
        isActiveEng
      }
    }
  }
`;

const USER_DATA = gql`
  query getUserData {
    userData @client {
      ssoId
      firstName
      phoneNum
      userStatus {
        isEmailValidated
        isMobileValidated
        isPhoneEmailConn
      }
      userCrmStatus {
        id
        isActiveTm
        isActiveHeb
        isActiveEng
      }
    }
  }
`;

const OTP_HASH = gql`
  query getOtpHash {
    otpHash @client
  }
`;

const PHONE_NUM = gql`
  query getPhoneNum {
    userData @client {
      phoneNum
    }
  }
`;

const USER_EMAIL = gql`
  query getUserEmail {
    userEmail @client
  }
`;

export { USER_DATA, PHONE_NUM, OTP_HASH, USER_EMAIL, };
