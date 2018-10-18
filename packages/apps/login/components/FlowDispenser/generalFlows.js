export default {
  transitionRouteMap: new Map([
    [ '-otpValidation', '/otpValidation' ],
    [ '-loginForms', '/loginForms' ],
    [ '-otpValidation2', '/otpValidation2' ],
    [ '-phoneInput', '/phoneInput' ],
    [ '-phoneMailSent', '/phoneMailSent' ],
    [ '-phoneMailSent2', '/phoneMailSent2' ],
    [ '-customerService', '/customerService' ],
    [ '-register', '/register' ],
    [ '-emailValidation', '/emailValidation' ],
    [ '-emailValidation2', '/emailValidation2' ],
    [ '-passwordError', '/passwordError', ],
    [ '-passwordReminder', '/passwordReminder', ],
    [ '-passwordReminderSent', '/passwordReminderSent', ],
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
    accept: 'success',
    withPassword: 'loginForms',
  },
};
