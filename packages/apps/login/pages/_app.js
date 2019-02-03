import { createApp, } from '@haaretz/htz-components';
import { withData, } from '@haaretz/app-utils';

const initialState = () => ({
  currentState: null,
  historyPointer: null,
  isEnterWithSms: false,
  isLoginSuccess: false,
  stateHistory: {
    pastState: null,
    pastTransition: null,
    __typename: 'StateHistory',
  },
  userData: {
    facebook: {
      redirect: null,
      token: null,
      __typename: 'facebookLogin',
    },
    firstName: null,
    phoneNum: null,
    ssoId: null,
    userCrmStatus: null,
    userLegalBySite: [],
    userStatus: {
      isEmailValidated: false,
      isMobileValidated: false,
      isPhoneEmailConn: false,
      __typename: 'UserStatus',
    },
    __typename: 'SsoUser',
  },
});

export default withData(createApp(), initialState);
