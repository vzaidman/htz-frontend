export default ({
  1: {
    flowNumber: 1,
    initialState: 'otpValidation',
    initialTransition: '/otpValidation',
    transitionRouteMap: new Map([
      [ '-otpValidation', '/otpValidation', ],
      [ '-otpValidation2', '/otpValidation2', ],
      [ '-password', '/password', ],
      [ '-phoneInput', '/phoneInput', ],
    ]),
    otpValidation: {
      sendAgain: 'otpValidation2',
      accept: 'success',
      withPassword: 'password',
      notMyPhone: 'phoneInput',
    },
    otpValidation2: {
      withPassword: 'password',
      getCustomerService: 'customerService',
    },
    phoneInput: {
      withPassword: 'password',
      accept: 'phoneMailSent',
    },
    phoneMailSent: {
      sendAgain: 'phoneMailSent2',
      withPassword: 'password',
    },
    phoneMailSent2: {
      getCustomerService: 'customerService',
      withPassword: 'password',
    },
  },
  2: {
    flowNumber: 2,
    initialState: 'emailPhoneInput',
    initialTransition: '/emailPhoneInput',
    emailPhoneInput: {
      withPassword: 'password',
      accept: 'phoneMailSent',
    },
    phoneMailSent: {
      withPassword: 'password',
      sendAgain: 'phoneMailSent2',
    },
    phoneMailSent2: {
      getCustomerService: 'customerService',
      withPassword: 'password',
    },
  },
  3: {
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
  4: { // TODO complete flows
    flowNumber: 4,
  },
  5: {
    flowNumber: 5,

  },
  6: {
    flowNumber: 6,

  },
});
