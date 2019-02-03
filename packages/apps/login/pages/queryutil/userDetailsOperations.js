import INSPECT_EMAIL, {
  USER,
  USER_ERRORS,
  USER_DATA,
  PHONE_NUM,
  OTP_HASH,
  USER_EMAIL,
  HOSTNAME,
  REFERRER,
  PHONE_EMAIL_CONFIRMATION,
  RETRIEVE_HASH,
  IS_SMS_ENTER,
  IS_LOGIN_SUCCESS,
} from '../queries/UserQueries';
import {
  GENERATE_HASH,
  CONNECT_MAIL_MOBILE,
  VALIDATE_MAIL_TO_MOBILE,
  SEND_MAIL_CONFIRMATION_REQUEST,
  CONFIRM_MAIL,
} from '../mutations/UserMutations';

const getDataFromUserInfo = client => email => client.query({
  query: INSPECT_EMAIL,
  variables: { email, },
})
  .then(res => res.data);

const mockDataFromUserInfo = client => email => Promise.resolve({
  userByMail: {
    ssoId: '20023790436',
    phoneNum: '0548888888',
    userStatus: {
      isEmailValidated: false,
      isMobileValidated: true,
      isPhoneEmailConn: false,
    },
    userCrmStatus: {
      id: 654654,
      isActiveTm: true,
      isActiveHeb: false,
      isActiveEng: false,
    },
  },
});

const isEnterWithSms = client => client.readQuery({ query: IS_SMS_ENTER, }).isEnterWithSms;
const saveIsEnterWithSms = client => boolean => client.writeData(
  { data: { isEnterWithSms: boolean, }, }
);
const getUser = client => client.readQuery({ query: USER, }).userData;
const getUserData = client => client.readQuery({ query: USER_DATA, }).userData;
const getOtpHash = client => {
  try {
    return client.readQuery({ query: OTP_HASH, }).otpHash;
  }
  catch (e) {
    return null;
  }
};
const getEmail = client => client.readQuery({ query: USER_EMAIL, }).userEmail;
const getPhoneNum = client => client.readQuery({ query: PHONE_NUM, }).userData.phoneNum;
const getErrors = client => client.readQuery({ query: USER_ERRORS, }).userData.errors;
const getHostname = client => client.readQuery({ query: HOSTNAME, }).hostname;
const getReferrer = client => client.readQuery({ query: REFERRER, }).loginReferrer;
const isLoginSuccess = client => client.readQuery({ query: IS_LOGIN_SUCCESS, }).loginSuccess;
const getPhoneEmailConfirmation = client => client.readQuery({
  query: PHONE_EMAIL_CONFIRMATION,
}).phoneEmailConfirmation;

const saveUserData = client => userDataObj => {
  client.writeData({ data: userDataObj, });
  return userDataObj;
};

const generateOtp = client => phoneNumObj => client.mutate({
  variables: phoneNumObj,
  mutation: GENERATE_HASH,
});

const retrieveHash = client => emailSsoObj => client.query({
  variables: emailSsoObj,
  query: RETRIEVE_HASH,
});

const connectMailWithPhone = client => ({ email, paramString, url, userName, phone, }) => client.mutate({
  variables: {
    email,
    url,
    userName,
    phone,
    paramString: `${Buffer.from(paramString).toString('base64')}`,
  },
  mutation: CONNECT_MAIL_MOBILE,
});

const validateMailWithPhone = client => dataObj => client.mutate({
  variables: dataObj,
  mutation: VALIDATE_MAIL_TO_MOBILE,
});

const sendMailConfirmation = client => ({ email, paramString, url, }) => client.mutate({
  variables: {
    email,
    url,
    paramString: `${Buffer.from(paramString).toString('base64')}`,
  },
  mutation: SEND_MAIL_CONFIRMATION_REQUEST,
});

const validateMailConfirmation = client => dataObj => client.mutate({
  variables: dataObj,
  mutation: CONFIRM_MAIL,
});

const saveOtpHash = client => otpHashObj => {
  client.writeData({ data: otpHashObj, });
  return otpHashObj;
};

const saveUserEmail = client => email => {
  client.writeData({ data: { userEmail: email, }, });
  return email;
};

const savePhoneNum = client => phoneNumObj => {
  client.writeData({ data: phoneNumObj, });
  return phoneNumObj;
};

const saveLoginSuccess = client => isSuccess => {
  client.writeData({ data: { loginSuccess: isSuccess, }, });
};

export {
  getPhoneNum,
  savePhoneNum,
  getUser,
  getUserData,
  getHostname,
  getReferrer,
  saveUserData,
  getErrors,
  getOtpHash,
  saveOtpHash,
  getEmail,
  getPhoneEmailConfirmation,
  saveUserEmail,
  getDataFromUserInfo,
  mockDataFromUserInfo,
  generateOtp,
  connectMailWithPhone,
  validateMailWithPhone,
  sendMailConfirmation,
  validateMailConfirmation,
  retrieveHash,
  isEnterWithSms,
  saveIsEnterWithSms,
  saveLoginSuccess,
  isLoginSuccess,
};
