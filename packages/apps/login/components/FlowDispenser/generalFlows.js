export default {
  transitionRouteMap: new Map([
    [ '-phoneMailSent', '/phoneMailSent', ],
    [ '-customerService', '/customerService', ],
    [ '-register', '/register', ],
    [ '-emailValidationSent', '/emailValidationSent', ],
    [ '-loginFormsPass', { url: '/loginForms', param: 1, }, ],
    [ '-loginFormsPhone', { url: '/loginForms', param: 0, }, ],
    [ '-loginFormsOtp', { url: '/loginForms', param: 0, }, ],
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
