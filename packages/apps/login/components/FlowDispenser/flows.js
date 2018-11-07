/* eslint-disable comma-dangle */
export default [
  {
    flowNumber: 1,
    initialState: 'loginFormsOtp',
    initialTransition: { url: '/loginForms', param: 2, },
    transitionRouteMap: new Map([]),
    loginFormsOtp: {
      withSms: 'loginFormsOtp',
      registration: 'register',
      notMyPhone: 'phoneInput',
    },
  },
  {
    flowNumber: 2,
    initialState: 'loginFormsPhone',
    initialTransition: { url: '/loginForms', param: 1, },
    transitionRouteMap: new Map([]),
    emailPhoneInput: {
      withPassword: 'loginFormsPass',
      accept: 'phoneMailSent',
    },
    phoneMailSent: {
      withPassword: 'loginForms',
      getCustomerService: 'customerService',
    },
    loginFormsPhone: {
      withSms: 'loginFormsOtp',
      registration: 'register',
      notMyPhone: 'phoneInput',
    },
  },
  {
    flowNumber: 3,
    initialState: 'emailValidationSent',
    initialTransition: '/emailValidationSent',
    transitionRouteMap: new Map([]),
  },
  {
    flowNumber: 4,
    initialState: 'register',
    initialTransition: '/register',
    transitionRouteMap: new Map([]),
  },
  {
    flowNumber: 5,
    initialState: 'loginFormsPass',
    initialTransition: { url: '/loginFormsPass', param: 0, },
    transitionRouteMap: new Map([]),
    loginFormsPass: {
      withSms: 'loginFormsPhone',
    },
  },
  {
    flowNumber: 6,
    initialState: 'loginFormsOtp',
    initialTransition: { url: '/loginFormsPass', param: 0, },
    transitionRouteMap: new Map([]),
  },
];
