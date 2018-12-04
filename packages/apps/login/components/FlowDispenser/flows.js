/* eslint-disable comma-dangle */
export default [
  {
    flowNumber: 1,
    initialState: 'loginFormsOtp',
    initialTransition: { url: '/loginForms', param: 0 },
    transitionRouteMap: new Map([]),
    loginFormsOtp: {
      registration: 'register',
      notMyPhone: 'loginFormsPhone',
      sendAgain: 'otpValidation2',
      accept: 'phoneMailSent',
    },
    loginFormsPass: {
      registration: 'register',
      withSms: 'loginFormsOtp',
      accept: 'phoneMailSent',
    },
  },
  {
    flowNumber: 2,
    initialState: 'loginFormsPhone',
    initialTransition: { url: '/loginForms', param: 1 },
    transitionRouteMap: new Map([]),
    emailPhoneInput: {
      withPassword: 'loginFormsPass',
      accept: 'phoneMailSent',
    },
    loginFormsPass: {
      registration: 'register',
      withSms: 'loginFormsPhone',
      accept: 'phoneMailSent',
    },
  },
  {
    flowNumber: 3,
    initialState: 'emailValidationSent',
    initialTransition: '/emailValidationSent',
    transitionRouteMap: new Map([]),
    loginFormsPass: {
      registration: 'register',
      withSms: 'loginFormsPhone',
      accept: 'phoneMailSent',
    },
  },
  {
    flowNumber: 4,
    initialState: 'register',
    initialTransition: '/register',
    transitionRouteMap: new Map([]),
    loginFormsPass: {
      registration: 'register',
      withSms: 'loginFormsPhone',
      accept: 'phoneMailSent',
    },
  },
  {
    flowNumber: 5,
    initialState: 'loginFormsPass',
    initialTransition: { url: '/loginForms', param: 0 },
    transitionRouteMap: new Map([]),
    loginFormsPass: {
      registration: 'register',
      withSms: 'loginFormsPhone',
      accept: 'phoneMailSent',
    },
  },
  {
    flowNumber: 6,
    initialState: 'loginFormsOtp',
    initialTransition: { url: '/loginForms', param: 0 },
    transitionRouteMap: new Map([]),
    loginFormsPass: {
      registration: 'register',
      withSms: 'loginFormsOtp',
      accept: 'phoneMailSent',
    },
  },
];
