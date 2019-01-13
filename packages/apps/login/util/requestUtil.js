import GET_HOST from '../pages/queries/GetHost';
import {
  generateOtp,
  getDataFromUserInfo,
  getEmail,
  getUserData,
  saveOtpHash,
  saveUserData,
} from '../pages/queryutil/userDetailsOperations';
import objTransform from './objectTransformationUtil';

const getHost = client => client.readQuery({ query: GET_HOST, }).hostname.match(/^(?:.*?\.)?(.*)/i)[1];

const checkForPhoneMailConnect = userData => {
  const transformed = objTransform({ userByMail: userData, })
  return !!transformed.user.isPhoneConnectedWithEmail;
};

const updateWithServerIfNeeded = ({ client, userData, }) => new Promise(resolve => {
  if (!userData.userStatus.isPhoneEmailConn) {
    resolve(
      getDataFromUserInfo(client)(getEmail(client))
        .then(res => saveUserData(client)({ userData: res.userByMail, }).userData)
    );
  }
  else {
    resolve(userData);
  }
});

const generateOtpErrorMessage = ({ msg, }) => {
  if (msg.includes('sms')) {
    return 'עקב מספר נסיונות כושלים לא ניתן להיכנס כעת.  אנא נסו שנית בעוד 20 דקות.';
  }
  return msg || 'אירעה שגיאה, אנא נסה שנית מאוחר יותר.';
};

const generateOtpHash = ({
  client,
  generationPredicate,
  phoneNumObject,
  successCallback,
  failCallback,
}) => shouldGenerate => {
  if (shouldGenerate && generationPredicate()) {
    generateOtp(client)(phoneNumObject)
      .then(data => {
        saveOtpHash(client)({ otpHash: data.data.generateOtp.hash, });
        return data.data.generateOtp;
      })
      .then(successCallback, failCallback);
  }
  else {
    failCallback({ msg: 'לא ביצעתם אימות של הטלפון דרך המייל שנשלח אליכם', });
  }
};

const handleGenerateOtpIO = ({
  client,
  phoneNumObject,
  miscOperations,
  generationPredicate = () => true,
  successCallback,
  failCallback,
}) => () => {
  miscOperations();
  const userData = getUserData(client);
  updateWithServerIfNeeded({ client, userData, })
    .then(checkForPhoneMailConnect)
    .then(generateOtpHash({
      client,
      generationPredicate,
      phoneNumObject,
      successCallback,
      failCallback,
    }));
};

export { getHost, handleGenerateOtpIO, generateOtpErrorMessage, };
