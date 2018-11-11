export default {
  transitionRouteMap: new Map([
    [ '-phoneMailSent', '/phoneMailSent', ],
    [ '-customerService', '/customerService', ],
    [ '-register', '/register', ],
    [ '-emailValidationSent', '/emailValidationSent', ],
    [ '-emailValidationSent2', '/emailValidationSent2', ],
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
    withPassword: 'loginFormsPass',
    getCustomerService: 'customerService',
  },
  loginFormsPhone: {
    withPassword: 'loginFormsPass',
    registration: 'register',
    accept: 'phoneMailSent',
  },
};
