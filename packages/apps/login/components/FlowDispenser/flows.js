/* eslint-disable comma-dangle */
export default (
  [
    {
      flowNumber: 1,
      initialState: 'otpValidation',
      initialTransition: '/otpValidation',
      transitionRouteMap: new Map([
        [ '-otpValidation', '/otpValidation' ],
        [ '-otpValidation2', '/otpValidation2' ],
        [ '-password', '/password' ],
        [ '-phoneInput', '/phoneInput' ],
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
    {
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
    { // TODO complete flows
      flowNumber: 4,
    },
    {
      flowNumber: 5,

    },
    {
      flowNumber: 6,

    },
  ]);
