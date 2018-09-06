export default ({
  transitionRouteMap: new Map([
    [ '-password', '/password', ],
    [ '-passwordError', '/passwordError', ],
    [ '-passwordReminder', '/passwordReminder', ],
    [ '-passwordReminderSent', '/passwordReminderSent', ],
    [ '-register', '/register', ],
    [ '-success', 'https://haaretz.co.il', ],
  ]),
  password: {
    forgotPassword: 'passwordReminder',
    accept: 'success',
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
    accept: 'password',
  },
  register: {
    accept: 'success',
    withPassword: 'password',
  },
});
