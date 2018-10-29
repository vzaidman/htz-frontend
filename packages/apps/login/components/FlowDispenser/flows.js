/* eslint-disable comma-dangle */
export default [
  {
    flowNumber: 1,
    initialState: 'otpValidation',
    initialTransition: '/otpValidation',
    transitionRouteMap: new Map([
      [ '-loginForms', { url: '/loginForms', param: 0, } ],
      [ 'otpValidation-loginForms', { url: '/loginForms', param: 1, } ],
    ]),
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
    emailValidationSent: {
      sendAgain: 'emailValidationSent2',
      registration: 'register',
    },
    emailValidationSent2: {
      getCustomerService: 'customerService',
      withPassword: 'loginForms',
    },
  },
  {
    flowNumber: 2,
    initialState: 'loginForms',
    initialTransition: { url: '/loginForms', param: 1 },
    transitionRouteMap: new Map([
      [ '-loginForms', { url: '/loginForms', param: 1 } ]
    ]),
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
    transitionRouteMap: new Map([
      [ 'otpValidation-loginForms', { url: '/loginForms', param: 1, } ],
      [ '-emailValidationSent', '/emailValidationSent' ],
      [ '-emailValidationSent2', '/emailValidationSent2' ],
    ]),
    emailValidationSent: {
      sendAgain: 'emailValidationSent2',
      notRegistered: 'register',
    },
    emailValidationSent2: {
      getCustomerService: 'customerService',
    },
  },
  {
    flowNumber: 4,
    initialState: 'register',
    initialTransition: '/register',
    transitionRouteMap: new Map([]),
    emailValidationSent: {
      sendAgain: 'emailValidationSent2',
      notRegistered: 'register',
    },
    emailValidationSent2: {
      getCustomerService: 'customerService',
    },
  },
  {
    flowNumber: 5,
    initialState: 'loginForms',
    initialTransition: { url: '/loginForms', param: 1 },
    transitionRouteMap: new Map([
      [ '-loginForms', { url: '/loginForms', param: 1, } ],
    ]),
  },
  {
    flowNumber: 6,
    initialState: 'otpValidation',
    initialTransition: '/otpValidation',
    transitionRouteMap: new Map([]),
  },
];
