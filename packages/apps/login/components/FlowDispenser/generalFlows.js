export default {
  transitionRouteMap: new Map([
    [ '-otpValidation', '/otpValidation', ],
    [ '-otpValidation2', '/otpValidation2', ],
    [ '-phoneInput', '/phoneInput', ],
    [ '-phoneMailSent', '/phoneMailSent', ],
    [ '-phoneMailSent2', '/phoneMailSent2', ],
    [ '-customerService', '/customerService', ],
    [ '-register', '/register', ],
    [ '-emailValidation', '/emailValidationSent', ],
    [ '-emailValidation2', '/emailValidationSent2', ],
    [ '-passwordError', '/passwordError', ],
    [ '-passwordReminder', '/passwordReminder', ],
    [ '-passwordReminderSent', '/passwordReminderSent', ],
    [ '-loginForms', '/loginForms', ],
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
};
