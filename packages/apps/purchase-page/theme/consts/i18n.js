export const seo = Object.freeze({
  'haaretz.co.il': Object.freeze({
    title: 'מינוי לאתר הארץ',
    description:
      'רכשו מינוי לאתר הארץ וקבלו את כל תכני הארץ במחשב ובאפליקציה, פחות פרסומות, פודקאסט שבועי ועדכונים שוטפים לכל מכשיר שתרצו.',
    googleSiteVerification: 's8ANajgxerP2VtcnQ05TxVZjP0A9EhPp70_PLse_cBY',
  }),
  'themarker.com': Object.freeze({
    title: 'מינוי לאתר TheMarker – מנוי לדה מרקר',
    description:
      'מינוי לאתר TheMarker: רכשו מנוי לדה מרקר וקבלו את כל תכני דהמרקר במחשב ובאפליקציה , פחות פרסומות, פודקאסט שבועי ועדכונים שוטפים לכל מכשיר שתרצו.',
    googleSiteVerification: '-3Rs25_Tuwid8njQF72cVtAcYAxGbYhXewg5Y4ppV_4',
  }),
});

export const creditPrefixI18n = Object.freeze({
  imageCreditPrefix: 'צילום',
});

export const linkToHomePage = Object.freeze({
  href: Object.freeze({
    'haaretz.co.il': 'https://www.haaretz.co.il/',
    'themarker.com': 'https://www.themarker.com/',
  }),
});

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
    afterCounter: startFromStage2 => `מתוך ${startFromStage2 ? 4 : 5}`,
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
  }),
  links: [
    // when adding links make sure to add a uniqe id
    {
      text: 'שאלות ותשובות',
      href: Object.freeze({
        'haaretz.co.il': 'https://www.haaretz.co.il/misc/faq',
        'themarker.com': 'https://www.themarker.com/misc/faq',
      }),
      hrefMobile: Object.freeze({
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
      hrefMobile: Object.freeze({
        'haaretz.co.il': 'https://www.haaretz.co.il/mobile/contact-us',
        'themarker.com': 'https://www.themarker.com/mobile/contact-us',
      }),
      id: 'contact',
    },
  ],
});

export const stage1 = Object.freeze({
  buttons: Object.freeze({
    organizationSubscription: Object.freeze({
      text: 'לרכישת מינוי אירגוני',
      url: Object.freeze({
        HTZ: 'https://secure.pulseem.com/subs_heb_edu/',
        TM: 'http://o-r.co/p/tm_edu_subs',
      }),
    }),
    entitlements: Object.freeze({
      beforeLinkText: 'כבר מנויים למהדורה המודפסת?',
      linkText: 'בדקו אם אתם זכאים להנחה',
      link: 'https://www.haaretz.co.il/misc/entitlement',
    }),
    loginRedirect: Object.freeze({
      beforeLinkText: 'כבר מנויים?',
      linkText: 'התחברו',
      url: Object.freeze({
        HTZ: 'https://www.haaretz.co.il/mobile/login',
        TM: 'https://www.themarker.com/mobile/login',
      }),
    }),
  }),
  headerText: 'בחרו את החבילה המשתלמת לכם',
  mobileExpandBtn: 'מה בחבילה?',
  thead: Object.freeze({
    mobileUnderPricing: Object.freeze({
      firstItem: 'כל התכנים, בכל מכשיר, בכל זמן',
      default: 'ניתן לבטל בכל עת',
    }),
    HTZ: Object.freeze({
      heading: 'הארץ בדיגיטל',
      src: 'fillup',
      btnText: 'המשך',
    }),
    BOTH: Object.freeze({
      heading: 'הארץ+TheMarker בדיגיטל',
      src: 'fillup',
      btnText: 'המשך',
    }),
    TM: Object.freeze({
      heading: 'TheMarker בדיגיטל',
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
        description: 'פודקאסט שבועי',
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

  tfoot: 'ניתן לבטל בכל עת',
});

export const stage2 = Object.freeze({
  header: Object.freeze({
    isFirst: {
      textBeforeChosen: 'החבילה שלכם:',
      textAfterChosen: 'כעת בחרו את המסלול המתאים לכם ביותר',
      chosenSubscriptionText: Object.freeze({
        BOTH: 'מינוי משולב הארץ-TheMarker',
        HTZ: 'מינוי הארץ',
        TM: 'מינוי TheMarker',
      }),
    },
    notFirst: {
      textBeforeChosen: 'בחרתם',
      textAfterChosen: 'כעת בחרו את המסלול המתאים לכם ביותר',
      chosenSubscriptionText: Object.freeze({
        BOTH: 'במינוי משולב',
        HTZ: 'במינוי הארץ',
        TM: 'במינוי TheMarker',
      }),
    },
  }),
  offerList: Object.freeze({
    termsButtonText: 'תנאי רכישה',
    currencySymbol: '₪',
  }),
  optionButtons: Object.freeze({
    students: 'מחיר מיוחד לסטודנטים ולחיילים',
    coupon: 'יש לי קופון הנחה',
  }),
  disclaimer: Object.freeze({
    title: 'תנאי רכישה',
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
  buttons: Object.freeze({
    entitlements: Object.freeze({
      beforeLinkText: 'כבר מנויים למהדורה המודפסת?',
      linkText: 'בדקו אם אתם זכאים להנחה',
      link: 'https://www.haaretz.co.il/misc/entitlement',
    }),
    organizationSubscription: Object.freeze({
      text: 'לרכישת מינוי אירגוני',
      url: Object.freeze({
        HTZ: 'https://secure.pulseem.com/subs_heb_edu/',
        TM: 'http://o-r.co/p/tm_edu_subs',
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
      yearly: 'במסלול שנתי',
      monthly: 'במסלול חודשי',
    }),
    // registerBoldFirstLine: 'ברוכים הבאים!',
    dynamicTextNewLineLoginStage: Object.freeze({
      checkEmail: [ 'כעת הזינו אימייל, שישמש לכניסה לאתר', ],
      login: [ 'כעת הזינו את הסיסמה שאיתה נרשמתם בעבר לאתר', ],
      register: [ 'כעת השלימו את ההרשמה לאתר', ],
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
      header: Object.freeze({ register: 'הרשמה', login: 'התחברות', }),
      buttonText: Object.freeze({ register: 'כבר רשומים?', login: 'לא זוכרים את הסיסמה?', }),
      buttonTextBold: Object.freeze({ register: 'החליפו כתובת דוא"ל', login: 'החליפו סיסמה', }),
    }),
    email: Object.freeze({
      errorText: 'נא למלא כתובת דוא"ל',
      errorTextInvalidEmail: 'יש להזין כתובת דוא"ל תקנית',
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
      errorTextNoPassword: 'נא למלא את הסיסמה שאיתה נרשמתם בעבר לאתר',
      errorTextUnderFiveChars: 'יש להזין סיסמה בת 6 תווים ומעלה',
      noteTextLogin: 'נא למלא את הסיסמה שאיתה נרשמתם בעבר לאתר',
      noteTextRegister: 'נא לבחור סיסמה',
      label: 'סיסמה',
      forgotPasswordText: 'שכחתי סיסמה',
    }),
    terms: Object.freeze({
      errorText: Object.freeze({
        HTZ: 'יש לאשר את תנאי השימוש באתר',
        TM: 'יש לאשר את תקנון האתר',
      }),
      noteText: Object.freeze({
        HTZ: 'יש לאשר את תנאי השימוש באתר',
        TM: 'יש לאשר את תקנון האתר',
      }),
      register: Object.freeze({
        labelBeforeTermsButton: 'אני מאשר/ת את',
        labelTerms: Object.freeze({ HTZ: 'תנאי השימוש', TM: 'התקנון', }),
        href: Object.freeze({
          HTZ: 'https://www.haaretz.co.il/misc/terms-of-use',
          TM: 'https://www.themarker.com/misc/site-policy',
        }),
        labelAfterTermsButton:
          ', וכן קבלת המלצות קריאה, הצעות לרכישת מינוי ודיוור מאתרי הארץ - TheMarker',
      }),
      loginText: 'אני מאשר/ת קבלת המלצות קריאה, הצעות לרכישת מינוי ודיוור מאתרי הארץ - TheMarker',
    }),
    continueButton: Object.freeze({
      text: 'המשך',
    }),
  }),
  resetPassword: Object.freeze({
    header: 'החלפת סיסמה',
    resetPasswordButton: 'המשך',
    successMessage: 'הוראות לאיפוס הסיסמה נשלחו לתיבת הדוא"ל שלך',
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
  error: Object.freeze({
    retryButton: 'נסו שוב',
  }),
});

export const stage4 = Object.freeze({
  header: Object.freeze({
    registered: {
      textTopLine: 'נרשמתם בהצלחה!',
      textNewLine: 'כעת בחרו את צורת התשלום הנוחה לכם',
    },
    loggedIn: {
      textTopLine: 'התחברתם בהצלחה!',
      textNewLine: 'בחרו את צורת התשלום הנוחה לכם',
    },
  }),
  details: Object.freeze({
    textBeforeChosen: 'בחרתם',
    textNewLine: 'כעת בחרו את צורת התשלום הנוחה לכם',
    chosenSubscriptionText: Object.freeze({
      BOTH: 'במינוי משולב',
      HTZ: 'במינוי הארץ',
      TM: 'במינוי TheMarker',
    }),
    chosenPaymentArrangementText: Object.freeze({
      yearly: 'במסלול שנתי',
      monthly: 'במסלול חודשי',
    }),
  }),
  securePaymentText: 'תשלום מאובטח',
  currencySymbol: '₪',
  headerPaymentMethod: 'אמצעי תשלום',
  form: Object.freeze({
    continueWithCreditCardText: 'המשך תשלום עם כרטיס שמספרו',
    hiddenCreditCardDigits: '•••• •••• ••••',
    paymentMethod: Object.freeze({
      errorText: 'בחר אמצעי תשלום',
    }),
    continueButton: Object.freeze({
      text: 'רכישת מנוי',
    }),
  }),
});

export const stage5 = Object.freeze({
  header: Object.freeze({
    textTopLine: 'כמעט סיימנו.',
    textNewLine: Object.freeze({
      existingCreditCard: 'בהמתנה לאישור התשלום בחברת האשראי',
      creditCard: 'כעת הזינו את פרטי כרטיס האשראי',
    }),
  }),
  details: Object.freeze({
    chosenSubscriptionText: Object.freeze({
      BOTH: 'מינוי משולב',
      HTZ: 'מינוי הארץ',
      TM: 'מינוי TheMarker',
    }),
    chosenPaymentArrangementText: Object.freeze({
      yearly: 'במסלול תשלום שנתי',
      monthly: 'במסלול תשלום חודשי',
    }),
    firstPaymentText: 'תשלום ראשון: ',
    nextPaymentText: 'התשלום הבא: ',
  }),
  securePaymentText: 'תשלום מאובטח',
  currencySymbol: '₪',
  existingCreditCard: Object.freeze({
    buttonText: 'נסו שוב',
    errorText: 'לא הצלחנו לקבל תשובה מהשרת. אנא נסו שוב. אם התקלה חוזרת, בחרו באמצעי תשלום אחר.',
  }),
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

export const newsletterI18n = Object.freeze({
  buttons: Object.freeze({
    newsletterSubmit: 'הרשמה',
    newsletterConfirmedButton: Object.freeze({
      ok: 'לרשימה המלאה',
      alreadyRegister: 'להרשמה לדיוורים נוספים',
      failed: 'נסו שנית',
    }),
  }),
  texts: Object.freeze({
    newsletterTitle: site => `קבלו את ${site === 'tm' ? 'TheMarker' : 'הארץ'} בכל בוקר לתיבת האימייל שלכם`,
    newsletterButton: 'הרשמה בקליק',
    newsletterConfirmedTitleText: Object.freeze({
      ok: 'תודה שנרשמת',
      alreadyRegister: 'אנחנו כבר מכירים',
      failed: 'קרתה תקלה ברישום',
    }),
    newsletterConfirmedText: Object.freeze({
      ok: 'יש לנו דיוורים נוספים שעשויים לעניין אותך',
      alreadyRegister: 'כתובת הדוא"ל שלך כבר רשומה לדיוור זה',
      failed: 'אנא נסו להרשם שוב במועד מאוחר יותר',
    }),
  }),
});

export const textInputI18n = Object.freeze({
  requiredLong: 'שדה חובה',
  requiredShort: '*',
});

export const generalError = Object.freeze({
  message: [ 'אופס! אירעה תקלה', 'לא ניתן לסיים את התהליך כעת. אנא נסו לבצע את התהליך שנית בעוד מספר דקות. במידה והבעיה חוזרת על עצמה, אנא פנו לשירות לקוחות.', ],
});

export const userHasDebt = Object.freeze({
  message: [ 'תשלום חוב', 'לא ניתן לרכוש מינוי ללא אישור גביה של החוב הקיים. אנא חזרו למסך אישור החב ואשרו את גבייתו.', ],
});

export const userHasProduct = Object.freeze({
  message: [ 'מוצר קיים', 'אתם כבר מנויים למוצר זה.', ],
});

export const paypalError = Object.freeze({
  message: [ 'אופס! אירעה תקלה', 'לא התקבלה תשובה מ-Paypal. אנא חכו מספר דקות לפני שתנסו שנית.', ],
});

export const thankYou = Object.freeze({
  afterPurchase: product => {
    const item = product === 'HTZ'
      ? 'להארץ'
      : product === 'TM'
        ? 'ל-TheMarker'
        : product === 'BOTH'
          ? 'משולב להארץ ו-TheMarker'
          : '';
    return `תודה שרכשתם מינוי ${item}`;
  },
  backToArticle: 'חזרה לכתבה:',
  fbBackToArticle: 'חזרה לכתבה',
  backToHomePage: 'לדף הבית',
  backToHomePageHref: Object.freeze({
    tm: 'https://www.themarker.com',
    htz: 'https://www.haaretz.co.il/',
  }),
  downloadAppText: Object.freeze({
    tm: 'הורידו חינם את אפליקציית The-Marker והישארו מחוברים',
    htz: 'הורידו חינם את אפליקציית הארץ והישארו מחוברים',
  }),
  downloadAppButtonText: 'להורדה',
  downloadAppHref: Object.freeze({
    htz: Object.freeze({
      iphone: 'https://itunes.apple.com/us/app/id521559643',
      android: 'https://play.google.com/store/apps/details?id=com.haaretz',
    }),
    tm: Object.freeze({
      iphone: 'https://itunes.apple.com/il/app/id360938308',
      android: 'https://play.google.com/store/apps/details?id=com.themarker',
    }),
  }),
  imgData: Object.freeze({
    htz: Object.freeze({
      imgName: 'image/3154103949.png',
      version: '1531919778',
      credit: 'הארץ',
      alt: 'אייפון עם אפליקציה של הארץ',
      contentId: '1.6290348',
    }),
    tm: Object.freeze({
      imgName: 'image/489174001.png',
      version: '1531919876',
      credit: 'הארץ',
      alt: 'אייפון עם אפליקציה של דה מארקר',
      contentId: '1.6290357',
    }),
  }),
});

export const changePayment = Object.freeze({
  userInstructions: 'הזינו את פרטי כרטיס האשראי',
  thankYou: 'עדכון פרטי כרטיס האשראי בוצע בהצלחה',
});
