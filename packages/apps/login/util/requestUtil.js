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
  console.log('inside check (transformed)', transformed) // TODO remove all console logs
  return !!transformed.user.isPhoneConnectedWithEmail
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
  console.log('after misc ops', userData)
  new Promise(resolve => {
    if (!userData.userStatus.isPhoneEmailConn) {
      console.log('isphoneemailconn false', userData)
      resolve(
        getDataFromUserInfo(client)(getEmail(client))
          .then(res => {
            return saveUserData(client)({ userData: res.userByMail, }).userData
          })
      );
    }
    else {
      resolve(userData);
    }
  })
    .then(checkForPhoneMailConnect)
    .then(shouldGenerate => {
      console.log('should generate', shouldGenerate, '/ngeneration predicate', generationPredicate())
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
    });
};

export { getHost, handleGenerateOtpIO, };
