export const linkToHomePage = Object.freeze({
  href: Object.freeze({
    'haaretz.co.il': 'https://www.haaretz.co.il/',
    'themarker.com': 'https://www.themarker.com/',
  }),
});

export const emailInputTexts = host => ({
  emailInputLabel: host === 'haaretz.com' ? 'email' : 'דוא"ל',
  emailInputRequiredLong: host === 'haaretz.com' ? 'required' : 'שדה חובה',
  emailInputRequiredShort: '*',
});

export const passwordInputTexts = host => ({
  passwordInputLabel: host === 'haaretz.com' ? 'password' : 'סיסמה',
  passwordInputRequiredLong: host === 'haaretz.com' ? 'required' : 'שדה חובה',
  passwordInputRequiredShort: '*',
});

export const phoneInputTexts = host => ({
  phoneInputLabel: host === 'haaretz.com' ? 'password' : 'מספר טלפון נייד',
  phoneInputRequiredLong: host === 'haaretz.com' ? 'required' : 'שדה חובה',
  phoneInputRequiredShort: '*',
});
