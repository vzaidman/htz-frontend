export const header = Object.freeze({
  backLinkText: 'חזור',
  underLogoText: Object.freeze({
    'haaretz.co.il': 'מינוי דיגיטלי',
    'themarker.com': 'עובדים רק בשבילך',
  }),
  trustedBadgeText: 'תשלום מאובטח',
});

export const landingHeader = Object.freeze({
  underLogoText: 'מינוי דיגיטלי',
});

export const offerPage = Object.freeze({
  stagesCounter: Object.freeze({
    beforeCounter: 'שלב',
    afterCounter: 'מתוך 5',
    debtTxt: 'הסדר חוב',
  }),
  userBanner: Object.freeze({
    hello: name => `שלום ${name},`,
    switch: 'החלף משתמש',
  }),
});

export const purchasePageFooter = Object.freeze({
  homePageLink: Object.freeze({
    text: 'דף הבית',
    href: Object.freeze({
      'haaretz.co.il': 'https://www.haaretz.co.il/',
      'themarker.com': 'https://www.themarker.com/',
    }),
  }),
  links: [
    // when adding links make sure to add a uniqe id
    {
      text: 'שאלות ותשובות',
      href: Object.freeze({
        'haaretz.co.il': 'https://www.haaretz.co.il/misc/faq',
        'themarker.com': 'https://www.themarker.com/misc/faq',
      }),
      id: 'q&a',
    },
    {
      text: 'צור קשר',
      href: Object.freeze({
        'haaretz.co.il': 'https://www.haaretz.co.il/misc/contact-us',
        'themarker.com': 'https://www.themarker.com/misc/contact-us',
      }),
      id: 'contact',
    },
  ],
});

export const stage1 = Object.freeze({
  thead: Object.freeze({
    HTZ: Object.freeze({
      heading: 'מינוי להארץ בלבד',
      src: 'fillup',
      btnText: 'המשך',
    }),
    BOTH: Object.freeze({
      heading: 'מינוי משולב',
      src: 'fillup',
      btnText: 'המשך',
    }),
    TM: Object.freeze({
      heading: 'מינוי ל-TheMarker בלבד',
      src: 'fillup',
      btnText: 'המשך',
    }),
  }),
  tbody: Object.freeze({
    pricingMonthlyText: 'מחיר חודשי',
    pricingYearlyText: 'מחיר שנתי',
    list: Object.freeze([
      Object.freeze({
        description: 'כל תכני הארץ במחשב ובאפליקציה',
        HTZ: true,
        BOTH: true,
        TM: false,
      }),
      Object.freeze({
        description: 'כל תכני TheMarker במחשב ובאפליקציה',
        HTZ: false,
        BOTH: true,
        TM: true,
      }),
      Object.freeze({
        description: 'פחות פרסומות באתר הארץ',
        HTZ: true,
        BOTH: true,
        TM: false,
      }),
      Object.freeze({
        description: 'פחות פרסומות ב-TheMarker',
        HTZ: false,
        BOTH: true,
        TM: true,
      }),
      Object.freeze({
        description: 'התראות במייל ובסמרטפון',
        HTZ: true,
        BOTH: true,
        TM: true,
      }),
      Object.freeze({
        description: 'פודקסט שבועי',
        HTZ: true,
        BOTH: true,
        TM: false,
      }),
      Object.freeze({
        description: 'אישור טוקבקים מזורז',
        HTZ: true,
        BOTH: true,
        TM: true,
      }),
      Object.freeze({
        description: 'ארכיון כתבות מ-2001',
        HTZ: true,
        BOTH: true,
        TM: true,
      }),
    ]),
  }),
  buttons: Object.freeze({
    organizationSubscription: {
      text: 'מינוי אירגוני',
      url: 'https://secure.pulseem.com/subs_heb_edu/',
    },
    subscribed: {
      text: 'יש או היה לי מינוי לעיתון',
      url: 'https://www.haaretz.co.il/misc/entitlement',
    },
  }),
  tfoot: 'ניתן לבטל בכל עת',
  mobileExpandBtn: 'מה בחבילה?',
  headerText: 'בחרו את החבילה המשתלמת לכם',
});

export const stage2 = Object.freeze({
  header: Object.freeze({
    textBeforeChosen: 'בחרתם',
    textAfterChosen: 'כעת תבחרו את המסלול המתאים לכם ביותר',
    chosenSubscriptionText: Object.freeze({
      BOTH: 'במינוי משולב',
      HTZ: 'במינוי הארץ',
      TM: 'במינוי TheMarker',
    }),
  }),
  offerList: Object.freeze({
    termsButtonText: 'תנאי רכישה',
    currencySymbol: '₪',
  }),
  optionButtons: Object.freeze({
    students: 'מחיר מיוחד לסטודנטים ולחיילים',
    coupon: 'יש לי קופון הנחה',
  }),
  form: Object.freeze({
    couponError: 'תקלת תקשורת, נא לנסות שוב מאוחר יותר',
    validation: 'נא הכנס קוד קופון תקין',
    couponForm: Object.freeze({
      textLabel: 'קופון הנחה',
      textNote: 'נא הכנס קוד קופון הנחה',
      buttons: Object.freeze({
        send: 'שלח',
        close: 'סגור',
      }),
    }),
  }),
});

export const stage3 = Object.freeze({
  header: Object.freeze({
    textBeforeChosen: 'בחרתם',
    chosenSubscriptionText: Object.freeze({
      BOTH: 'במינוי משולב',
      HTZ: 'במינוי הארץ',
      TM: 'במינוי TheMarker',
    }),
    chosenPaymentArrangementText: Object.freeze({
      yearly: 'בתשלום שנתי',
      monthly: 'בתשלום חודשי',
    }),
    dynamicTextNewLineLoginStage: Object.freeze({
      checkEmail: [ 'כעת הזינו כתובת דוא"ל.', 'כתובת זאת תהיה שם המשתמש שלכם.', ],
      login: [ 'הזינו את הסיסמה שלכם לאתר', ],
      register: [ 'השלימו את פרטי המשתמש באתר', ],
    }),
  }),
  details: Object.freeze({
    firstPaymentText: 'תשלום ראשון: ',
    nextPaymentText: 'תשלום הבא: ',
  }),
  securePaymentText: 'תשלום מאובטח',
  currencySymbol: '₪',
  form: Object.freeze({
    registerHeader: Object.freeze({
      header: 'הרשמה',
      buttonText: 'כבר רשומים?',
      buttonTextBold: 'החליפו כתובת דוא"ל',
    }),
    email: Object.freeze({
      errorText: 'נא למלא כתובת דוא"ל',
      noteText: 'נא למלא כתובת דוא"ל',
      label: 'דוא"ל',
    }),
    firstName: Object.freeze({
      errorText: 'נא למלא שם פרטי',
      errorTextUnderTwoChars: 'יש להזין שם המורכב מ-2 אותיות לפחות וללא מספרים',
      noteText: 'נא למלא שם פרטי',
      label: 'שם פרטי',
    }),
    lastName: Object.freeze({
      errorText: 'נא למלא שם משפחה',
      errorTextUnderTwoChars: 'יש להזין שם המורכב מ-2 אותיות לפחות וללא מספרים',
      noteText: 'נא למלא שם משפחה',
      label: 'שם משפחה',
    }),
    password: Object.freeze({
      errorTextNoPassword: 'נא למלא סיסמא',
      errorTextUnderFiveChars: 'יש להזין סיסמא בת 6 תווים ומעלה',
      noteTextLogin: 'נא למלא סיסמא',
      noteTextRegister: 'נא לבחור סיסמא',
      label: 'סיסמא',
      forgotPasswordText: 'שכחתי סיסמא',
    }),
    terms: Object.freeze({
      errorText: 'יש לאשר את תנאי השימוש באתר',
      noteText: 'יש לאשר את תנאי השימוש באתר',
      register: Object.freeze({
        labelBeforeTermsButton: 'אני מאשר/ת את',
        labelTerms: Object.freeze({ HTZ: 'תנאי השימוש', TM: 'התקנון', }),
        href: Object.freeze({
          HTZ: 'https://www.haaretz.co.il/misc/terms-of-use',
          TM: 'https://www.themarker.com/misc/site-policy',
        }),
        labelAfterTermsButton:
          ', וכן קבלת דיוורים, המלצות קריאה והצעות לרכישת מינוי מאתרי הארץ-TheMarker',
      }),
      loginText:
        'אני מאשר/ת קבלת דיוורים, המלצות קריאה והצעות לרכישת מינוי מאתרי הארץ-TheMarker',
    }),
    continueButton: Object.freeze({
      text: 'המשך',
    }),
  }),
  resetPassword: Object.freeze({
    header: 'החלפת סיסמא',
    resetPasswordButton: 'המשך',
    successMessage: 'הוראות לאיפוס הסיסמא נשלחו לתיבת הדוא"ל שלך',
    successButtonText: 'התחבר',
  }),
  subStage2: Object.freeze({
    headerPersonalDetails: 'פרטים  אישיים',
    headerPaymentMethod: 'אמצעי תשלום',
    form: Object.freeze({
      firstName: Object.freeze({
        errorText: 'אנא הזינו שם פרטי',
        noteText: 'אנא הזינו שם פרטי',
        label: 'שם פרטי',
      }),
      lastName: Object.freeze({
        errorText: 'אנא הזינו שם משפחה',
        noteText: 'אנא הזינו שם משפחה',
        label: 'שם משפחה',
      }),
      phone: Object.freeze({
        errorText: 'אנא הזינו מספר טלפון נייד',
        label: 'טלפון נייד',
        noteText: 'אנא הזינו מספר טלפון נייד',
      }),
      paymentMethod: Object.freeze({
        errorText: 'בחר אמצעי תשלום',
        noteText: 'בחר אמצעי תשלום',
      }),
      continueButton: Object.freeze({
        text: 'רכישת מנוי',
      }),
    }),
  }),
});

export const stage4 = Object.freeze({
  header: Object.freeze({
    textBeforeName: 'שלום',
    registered: {
      textAfterName: 'נוצר לך משתמש חדש',
      textNewLine: 'אנא בחרו את צורת התשלום הנוחה לכם',
    },
    loggedIn: {
      textNewLine: 'אנא בחרו את צורת התשלום הנוחה לכם',
    },
  }),
  details: Object.freeze({
    textBeforeChosen: 'בחרתם',
    textNewLine: 'אנא בחרו את צורת התשלום הנוחה לכם',
    chosenSubscriptionText: Object.freeze({
      BOTH: 'במינוי משולב',
      HTZ: 'במינוי הארץ',
      TM: 'במינוי TheMarker',
    }),
    chosenPaymentArrangementText: Object.freeze({
      yearly: 'בתשלום שנתי',
      monthly: 'בתשלום חודשי',
    }),
    firstPaymentText: 'תשלום ראשון: ',
    nextPaymentText: 'תשלום הבא: ',
  }),
  securePaymentText: 'תשלום מאובטח',
  currencySymbol: '₪',
  subStage2: Object.freeze({
    headerPersonalDetails: 'פרטים  אישיים',
    headerPaymentMethod: 'אמצעי תשלום',
    form: Object.freeze({
      paymentMethod: Object.freeze({
        errorText: 'בחר אמצעי תשלום',
      }),
      continueButton: Object.freeze({
        text: 'רכישת מנוי',
      }),
    }),
  }),
});
export const stage5 = Object.freeze({
  header: Object.freeze({
    textBeforeName: 'שלום',
    registered: {
      textAfterName: 'נוצר לך משתמש חדש',
      textNewLine: 'אנא הזינו את פרטי כרטיס האשראי',
    },
    loggedIn: {
      textNewLine: 'אנא הזינו את פרטי כרטיס האשראי',
    },
  }),
  details: Object.freeze({
    textBeforeChosen: 'בחרתם',
    textNewLine: 'אנא הזינו את פרטי כרטיס האשראי',
    chosenSubscriptionText: Object.freeze({
      BOTH: 'במינוי משולב',
      HTZ: 'במינוי הארץ',
      TM: 'במינוי TheMarker',
    }),
    chosenPaymentArrangementText: Object.freeze({
      yearly: 'במסלול תשלום שנתי',
      monthly: 'במסלול תשלום חודשי',
    }),
    firstPaymentText: 'תשלום ראשון: ',
    nextPaymentText: 'תשלום הבא: ',
  }),
  securePaymentText: 'תשלום מאובטח',
  currencySymbol: '₪',
});

export const payment = Object.freeze({
  payVia: 'תשלום באמצעות',
  creditCard: ' כרטיס אשראי',
});

export const creditCardIframe = Object.freeze({
  tryAgain: 'נסו שנית',
  defaultErrorMessage: 'תקלת תקשורת אנא נסו שנית',
});

export const debt = Object.freeze({
  currency: 'ש"ח',
  header:
    'המערכת האוטומטית שלנו מזהה כי בעבר כבר רכשת מנוי דיגיטלי ולא הסדרת את מלוא התשלום על השירות שניתן.',
  amount: amount => `חובך עומד כעת על ${amount}`,
  underAmount: 'סכום זה יתווסף לתשלום על המינוי שבו בחרת כעת.',
  mistake: Object.freeze({
    text: 'אם חלה טעות, ניתן לפנות לשירות הלקוחות שלנו במייל ',
    href: 'mailto:digital_support@haaretz.co.il',
    content: 'digital_support@haaretz.co.il',
  }),
  form: Object.freeze({
    validateError: 'חובה לאשר את גביית החוב על מנת להמשיך ברכישה',
    checkBox: Object.freeze({
      label: 'אני מאשר/ת את גביית החוב בעמוד זה',
      note: 'יש לאשר הסדר חוב',
    }),
    submit: 'המשך לרכישה',
  }),
});

export const thankYou = Object.freeze({
  afterPurchase: product => {
    const item =
      product === 'HTZ'
        ? 'להארץ'
        : product === 'TM'
          ? 'ל-TheMarker'
          : product === 'BOTH' ? 'משולב להארץ ו-TheMarker' : '';
    return `תודה שרכשתם מינוי ${item}`;
  },
  secondaryHeader: 'כל כתבות האתר פתוחות כעת בפניך לקריאה רצופה ומהנה',
  backToArticleText: 'בחזרה לכתבה:',
  backToArticleContent: 'כל כתבות האתר פתוחות כעת בפניך לקריאה רצופה ומהנה',
});
