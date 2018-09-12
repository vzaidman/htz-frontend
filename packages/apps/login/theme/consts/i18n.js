export const linkToHomePage = Object.freeze({
  href: Object.freeze({
    'haaretz.co.il': 'https://www.haaretz.co.il/',
    'themarker.com': 'https://www.themarker.com/',
  }),
});

export const emailInputTexts = host => ({
  emailInputLabel: host === 'haaretz.com' ? 'email' : 'אימייל',
  emailInputRequiredLong: host === 'haaretz.com'
    ? 'required'
    : 'שדה חובה',
  emailInputRequiredShort: '*',
});
