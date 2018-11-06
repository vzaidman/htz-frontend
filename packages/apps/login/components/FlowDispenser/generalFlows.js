export default {
  transitionRouteMap: new Map([
    [ '-otpValidation', '/otpValidation', ],
    [ '-otpValidation2', '/otpValidation2', ],
    [ '-phoneInput', '/phoneInput', ],
    [ '-phoneMailSent', '/phoneMailSent', ],
    [ '-phoneMailSent2', '/phoneMailSent2', ],
    [ '-customerService', '/customerService', ],
    [ '-register', '/register', ],
    [ '-emailValidationSent', '/emailValidationSent', ],
    [ '-emailValidationSent2', '/emailValidationSent2', ],
    [ '-passwordError', '/passwordError', ],
    [ '-passwordReminder', '/passwordReminder', ],
    [ '-passwordReminderSent', '/passwordReminderSent', ],
    [ '-loginForms', '/loginForms', ],
    [ '-emailValidationSent', '/emailValidationSent', ],
    [ '-success', '/', ],
  ]),
  loginForms: {
    withSms: 'otpValidation',
    registration: 'register',
  },
  passwordError: {
    forgotPassword: 'passwordReminder',
    notRegistered: 'register',
    accept: 'success',
  },
  passwordReminder: {
    accept: 'passwordReminderSent',
  },
  passwordReminderSent: {
    accept: 'loginForms',
  },
  register: {
    success: 'emailValidationSent',
    backToLogin: 'loginForms',
  },
  emailValidationSent: {
    sendAgain: 'emailValidationSent2',
  },
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
};
