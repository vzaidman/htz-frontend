/* eslint-disable comma-dangle */
export default [
  {
    flowNumber: 1,
    initialState: 'otpValidation',
    initialTransition: '/otpValidation',
    transitionRouteMap: new Map([
      [ '-loginForms', { url: '/loginForms', param: 0 } ],
      [ 'otpValidation-loginForms', { url: '/loginForms', param: 1 } ],
    ]),
    phoneMailSent: {
      sendAgain: 'phoneMailSent2',
      withPassword: 'loginForms',
    },
    phoneMailSent2: {
      getCustomerService: 'customerService',
      withPassword: 'loginForms',
    },
  },
  {
    flowNumber: 2,
    initialState: 'phoneInput',
    initialTransition: '/phoneInput',
    transitionRouteMap: new Map([
      [ '-loginForms', '/loginForms', ],
      [ 'otpValidation-loginForms', '/loginForms', ],
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
    ]),
  },
  {
    flowNumber: 4,
    initialState: 'register',
    initialTransition: '/register',
    transitionRouteMap: new Map([]),
  },
  {
    flowNumber: 5,
    initialState: 'loginForms',
    initialTransition: { url: '/loginForms', param: 1 },
    transitionRouteMap: new Map([ [ '-loginForms', { url: '/loginForms', param: 1 } ] ]),
  },
  {
    flowNumber: 6,
    initialState: 'otpValidation',
    initialTransition: '/otpValidation',
    transitionRouteMap: new Map([]),
  },
];
