/* eslint-disable comma-dangle */
export default [
  {
    flowNumber: 1,
    initialState: 'otpValidation',
    initialTransition: '/otpValidation',
    transitionRouteMap: new Map(
      [ '-loginForms', { url: '/loginForms', param: 0 } ],
    ),
    otpValidation: {
      sendAgain: 'otpValidation2',
      accept: 'success',
      withPassword: 'loginForms',
      notMyPhone: 'phoneInput',
    },
    otpValidation2: {
      withPassword: 'loginForms',
      getCustomerService: 'customerService',
      notMyPhone: 'phoneInput',
    },
    phoneInput: {
      withPassword: 'loginForms',
      accept: 'phoneMailSent',
    },
    phoneMailSent: {
      sendAgain: 'phoneMailSent2',
      withPassword: 'loginForms',
    },
    phoneMailSent2: {
      getCustomerService: 'customerService',
      withPassword: 'loginForms',
    },
    emailValidation: {
      sendAgain: 'emailValidation2',
      registration: 'register',
    },
    emailValidation2: {
      getCustomerService: 'customerService',
      withPassword: 'loginForms',
    },
    register: {
      backToLogin: 'loginForms',
    },
  },
  {
    flowNumber: 2,
    initialState: 'loginForms',
    initialTransition: '/loginForms',
    transitionRouteMap: new Map(
      //[ '-loginForms', { url: '/loginForms', param: 0 } ]
    ),
    emailPhoneInput: {
      withPassword: 'loginForms',
      accept: 'phoneMailSent',
    },
    phoneMailSent: {
      withPassword: 'loginForms',
      sendAgain: 'phoneMailSent2',
    },
    phoneMailSent2: {
      getCustomerService: 'customerService',
      withPassword: 'loginForms',
    },
  },
  {
    flowNumber: 3,
    initialState: 'emailValidationSent',
    initialTransition: '/emailValidationSent',
    emailValidationSent: {
      sendAgain: 'emailValidationSent2',
      notRegistered: 'register',
    },
    emailValidationSent2: {
      getCustomerService: 'customerService',
    },
  },
  {
    // TODO complete flows
    flowNumber: 4,
  },
  {
    flowNumber: 5,
  },
  {
    flowNumber: 6,
  },
];
