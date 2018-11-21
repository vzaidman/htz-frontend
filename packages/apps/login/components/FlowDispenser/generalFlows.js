export default {
  transitionRouteMap: new Map([
    [ '-phoneMailSent', '/phoneMailSent', ],
    [ '-phoneMailSent2', '/phoneMailSent2', ],
    [ '-customerService', '/customerService', ],
    [ '-register', '/register', ],
    [ '-emailValidationSent', '/emailValidationSent', ],
    [ '-emailValidationSent2', '/emailValidationSent2', ],
    [ '-otpValidation', '/otpValidation', ],
    [ '-otpValidation2', '/otpValidation2', ],
    [ '-loginFormsPass', { url: '/loginForms', param: 1, }, ],
    [ '-loginFormsPhone', { url: '/loginForms', param: 0, }, ],
    [ '-loginFormsOtp', { url: '/loginForms', param: 0, }, ],
    [ '-success', '/', ],
  ]),
  emailValidationSent: {
    getCustomerService: 'customerService',
    withPassword: 'loginFormsPass',
    notRegistered: 'register',
    sendAgain: 'emailValidationSent2',
    notMyPhone: 'loginFormsPhone',
  },
  emailValidationSent2: {
    getCustomerService: 'customerService',
    withPassword: 'loginFormsPass',
  },
  passwordReminderSent: {
    accept: 'loginFormsPass',
  },
  register: {
    success: 'emailValidationSent',
    backToLogin: 'loginFormsPass',
  },
  phoneMailSent: {
    sentAgain: 'phoneMailSent2',
    withPassword: 'loginFormsPass',
    getCustomerService: 'customerService',
  },
  phoneMailSent2: {
    withPassword: 'loginFormsPass',
  },
  loginFormsPhone: {
    withPassword: 'loginFormsPass',
    registration: 'register',
    accept: 'phoneMailSent',
    notMyPhone: 'loginFormsPhone',
    sendAgain: 'otpValidation2',
  },
  loginFormsOtp: {
    withPassword: 'loginFormsPass',
    registration: 'register',
    notMyPhone: 'loginFormsPhone',
    sendAgain: 'otpValidation2',
  },
};
