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
  phoneInputLabel: host === 'haaretz.com' ? 'Mobile Number' : 'מספר טלפון נייד',
  phoneInputRequiredLong: host === 'haaretz.com' ? 'required' : 'שדה חובה',
  phoneInputRequiredShort: '*',
});

export const nameInputTexts = (host) => ({
  nameInputLabel: host === 'haaretz.com' ? ['First Name', 'Last Name'] : ['שם פרטי', 'שם משפחה'],
  nameInputRequiredLong: host === 'haaretz.com' ? 'required' : 'שדה חובה',
  nameInputRequiredShort: '*',
});


export const footerMobileListsI18n = Object.freeze({
  MobileList: [
    Object.freeze({
      text: 'רכשו מנוי',
      link: 'https://www.haaretz.co.il/promotions-page',
    }),
    Object.freeze({
      text: 'בלוגים',
      link: 'https://www.haaretz.co.il/blogs',
    }),
    Object.freeze({
      text: 'תנאי שימוש',
      link: 'https://www.haaretz.co.il/misc/terms-of-use',
    }),
    Object.freeze({
      text: 'צרו קשר',
      link: 'https://www.haaretz.co.il/mobile/contact-us',
    }),
    Object.freeze({
      text: 'פרסמו באתר',
      link: 'https://www.haaretz.co.il/st/c/prod/global/mediaKit/haaretzHeb.html',
    }),
    Object.freeze({
      text: 'שירות למנויים',
      link: 'https://www.haaretz.co.il/personal-area/my-account',
    }),
  ],
  ButtonName: Object.freeze({
    text: 'להורדת האפליקציה',
  }),
  Copyright: Object.freeze({
    text: '© כל הזכויות שמורות',
  }),
});

export const footerDesktopI18n = Object.freeze({
  ExpandedButton: Object.freeze({
    close: 'סגור',
    showMore: 'הצג עוד',
  }),
  Copyright: Object.freeze({
    firstRow:
      'חדשות, ידיעות מהארץ והעולם - הידיעות והחדשות בעיתון הארץ. סקופים, מאמרים, פרשנויות ותחקירי עומק באתר האיכותי בישראל',
    secondRow: '© כל הזכויות שמורות להוצאת עיתון הארץ בע"מ',
  }),
});