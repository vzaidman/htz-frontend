export default {
  transitionRouteMap: new Map([
    [ '-phoneInput', '/phoneInput', ],
    [ '-phoneMailSent', '/phoneMailSent', ],
    [ '-customerService', '/customerService', ],
    [ '-register', '/register', ],
    [ '-emailValidationSent', '/emailValidationSent', ],
    [ '-loginFormsPass', { url: '/loginForms', param: 0, }, ],
    [ '-loginFormsPhone', { url: '/loginForms', param: 1, }, ],
    [ '-loginFormsOtp', { url: '/loginForms', param: 2, }, ],
    [ '-success', '/', ],
  ]),
  emailValidationSent: {
    getCustomerService: 'customerService',
    withPassword: 'loginFormsPass',
    notRegistered: 'register',
  },
  passwordReminderSent: {
    accept: 'loginFormsPass',
  },
  register: {
    success: 'emailValidationSent',
    backToLogin: 'loginFormsPass',
  },
  loginFormsPhone: {
    withPassword: 'loginFormsPass',
    accept: 'phoneMailSent',
  },
  phoneMailSent: {
    withPassword: 'loginFormsPass',
    getCustomerService: 'customerService',
  },
};
