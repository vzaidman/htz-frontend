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
      userLegalBySite {
        termsAgreedSite
      }
    }
  }
`;

const IS_SMS_ENTER = gql`
  query isEnterWithSms {
    isEnterWithSms @client
  }
`;

const USER = gql`
  query getUser {
    userData @client {
      ssoId
      userCrmStatus {
        id
        isActiveTm
        isActiveHeb
        isActiveEng
      }
      facebook {
        token
        redirect
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
      hasDebt
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
      userLegalBySite {
        termsAgreedSite
      }
    }
  }
`;

const USER_PRODUCTS = gql`
  query getUserProducts($id: String!) {
    user(id: $id) {
      products {
        prodNum
        debtActive
      }
    }
  }
`;

const RETRIEVE_HASH = gql`
  query retrieveHash($email: String!, $ssoId: String!) {
    retrieveOtpHash(email: $email, ssoId: $ssoId) {
      success
      msg
      hash
    }
  }
`;

const OTP_HASH = gql`
  query getOtpHash {
    otpHash @client
  }
`;

const USER_ERRORS = gql`
  query getErrors {
    userData @client {
      errors
    }
  }
`;

const PHONE_NUM = gql`
  query getPhoneNum {
    userData @client {
      phoneNum
    }
  }
`;

const HOSTNAME = gql`
  query getHostname {
    hostname @client
  }
`;

const REFERRER = gql`
  query getReferrer {
    loginReferrer @client
  }
`;

const USER_EMAIL = gql`
  query getUserEmail {
    userEmail @client
  }
`;

const PHONE_EMAIL_CONFIRMATION = gql`
  query getUserEmail {
    phoneEmailConfirmation @client
  }
`;

export {
  USER,
  USER_ERRORS,
  USER_DATA,
  PHONE_NUM,
  OTP_HASH,
  USER_EMAIL,
  HOSTNAME,
  REFERRER,
  PHONE_EMAIL_CONFIRMATION,
  USER_PRODUCTS,
  RETRIEVE_HASH,
  IS_SMS_ENTER,
};
