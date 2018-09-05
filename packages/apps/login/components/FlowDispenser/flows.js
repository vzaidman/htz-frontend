export default ({
  1: {
    initialState: 'otpValidation',
    initialTransition: '/otpValidation',
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
  4: {

  },
  5: {

  },
  6: {

  },
});
