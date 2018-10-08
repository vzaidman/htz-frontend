export const alertsI18n = Object.freeze({
  mobileAlertsText: 'התראות',
  desktopAlertsText: 'התראות במייל',
});

export const seriesArticleI18n = Object.freeze({
  loadButton: Object.freeze({
    close: 'טען את כל הכתבות בסדרה',
    open: 'סגירת הרשימה',
    ariaText: x => `נוספו ${x} כתבות`,
  }),
  titlePrefix: 'סדרת כתבות: ',
});

export const zoominText = 'הגדל';
export const zoomoutText = 'הקטן';

export const galleryI18n = Object.freeze({
  captionPrefix: (current, total) => `"${current} מתוך ${total} | "`,
});

export const textInputI18n = Object.freeze({
  requiredLong: 'שדה חובה',
  requiredShort: '*',
});

export const tagsElementI18n = Object.freeze({
  prefix: 'תגיות:',
});

export const breadcrumbsI18n = Object.freeze({
  ariaLabel: 'מיקומך באתר',
});

export const clickTrackerI18n = Object.freeze({
  promotedContentLabel: 'תוכן מקודם',
});

export const creditPrefixI18n = Object.freeze({
  imageCreditPrefix: 'צילום',
});

export const navigationMenuI18n = Object.freeze({
  buttonText: 'ניווט',
});

export const mobileNavigationMenuI18n = Object.freeze({
  buttonText: 'ניווט',
  subOpen: 'עוד',
  subClose: 'סגור',
});

export const mobileQuickRegistrationI18n = Object.freeze({
  signedUpText: 'תודה שנרשמת',
});

export const headerSearchI18n = Object.freeze({
  buttonText: 'חיפוש',
  placeHolder: 'הקלידו לחיפוש באתר',
  queryUrl: query =>
    `https://www.haaretz.co.il/misc/search-results?text=${query}&searchType=textSearch`,
});

export const mobileSearchI18n = Object.freeze({
  buttonText: 'חיפוש',
  placeHolder: 'חיפוש',
  queryUrl: query =>
    `https://www.haaretz.co.il/misc/search-results?text=${query}&searchType=textSearch`,
});

export const osakaI18n = Object.freeze({
  backToHome: 'בחזרה לעמוד הבית',
  backToSection: 'בחזרה למדור',
  nextArticle: 'לכתבה הבאה במדור',
  promotedContent: 'תוכן מקודם',
});

export const commentI18n = Object.freeze({
  tags: Object.freeze({
    editorsPick: 'בחירת העורכים',
    usersPick: 'בחירת הגולשים',
  }),
  buttons: Object.freeze({
    readMoreBtnTxt: 'קראו עוד',
    replyBtnTxt: 'הגיבו',
    reportAbuseBtnTxt: 'דווחו כפוגעני',
  }),
});

export const commentFormI18n = Object.freeze({
  buttons: Object.freeze({
    sendBtnTxt: 'שלחו',
    cancelBtnTxt: 'בטלו',
    toggleUserBtnText: identified =>
      (identified ? 'להוספת תגובה אנונימית לחצו כאן' : 'להוספת תגובה מזוהה לחצו כאן'),
  }),
  labels: Object.freeze({
    nameLabelTxt: 'שם',
    commentLabelTxt: 'תגובה',
  }),
  notes: Object.freeze({
    nameNoteTxt: 'הזינו שם שיוצג כמחבר התגובה',
    commentNoteTxt: 'בשליחת תגובה זו הנני מצהיר שהינני מסכים/ה עם תנאי השימוש של אתר הארץ',
  }),
  errorNotes: Object.freeze({
    nameErrorNoteTxt: 'חובה להזין שם',
    commentErrorNoteTxt: 'נא להזין את תוכן התגובה',
    commentErrorTooLongNoteTxt: 'אין להזין יותר מ-1,000 תווים בתוכן התגובה',
  }),
});
export const commentSentI18n = Object.freeze({
  buttons: Object.freeze({
    getNotificationsBtnTxt: 'עדכנו אותי',
    dontGetNotificationsBtnTxt: 'לא תודה',
    closeBtnText: 'סגור',
  }),
  labels: Object.freeze({
    emailLabelTxt: 'דוא"ל',
  }),
  notes: Object.freeze({
    emailNoteTxt: 'הזינו כתובת דוא"ל לקבלת התראות',
  }),
  errorNotes: Object.freeze({
    emailErrorNoteTxt: 'נא להזין כתובת דוא"ל תקינה',
  }),
  texts: Object.freeze({
    commentRecievedBoldText: 'תגובתך נקלטה בהצלחה, ',
    commentRecievedText: 'ותפורסם על פי מדיניות המערכת.',
    commentRecievedTextSecondRow: 'באפשרותך לקבל התראה בדוא"ל כאשר תגובתך תאושר ותפורסם',
    commentRecievedBoldTextThankYouPage: 'תודה!',
    commentRecievedTextThankYouPage: 'תגובתך נקלטה בהצלחה ותפורסם על פי מדיניות המערכת',
  }),
});
export const commentsSectionI18n = Object.freeze({
  buttons: Object.freeze({
    loadMoreCommentsBtnText: 'טענו עוד תגובות',
  }),
  selectItems: Object.freeze({
    dateDescendingItemTxt: 'מהאחרונה לראשונה',
    dateAscendingItemTxt: 'מהראשונה לאחרונה',
    commentRatingItemTxt: 'הצג לפי דירוג',
    editorsPickItemTxt: 'בחירת העורכים',
  }),
  texts: Object.freeze({
    chooseSortMethodText: 'סדרו את התגובות',
  }),
  likes: Object.freeze({
    like: 'אהבתי',
    dislike: 'לא אהבתי',
  }),
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
      link: 'https://www.haaretz.co.il/misc/contact-us',
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

export const newsletterI18n = Object.freeze({
  buttons: Object.freeze({
    newsletterConfirmedButton: Object.freeze({
      ok: 'לרשימה המלאה',
      alreadyRegister: 'להרשמה לדיוורים נוספים',
      failed: 'נסו שנית',
    }),
  }),
  texts: Object.freeze({
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

export const fryListI18n = Object.freeze({
  title: 'מרחבי הרשת',
});

export const welcomePageI18n = Object.freeze({
  texts: Object.freeze({
    headerHighLighted: 'ברוכים הבאים',
    headerNormal: 'לחוויה המשודרגת של הארץ',
    bullets: [
      'מהיר יותר',
      'נוח לקריאה',
      'מותאם יותר למובייל',
      'פחות פרסומות',
      'ממשק תגובות משופר',
      'קל ומהיר יותר לשתף',
    ],
  }),
  buttonText: 'לעמוד החדש',
});

export const userMenuI18n = Object.freeze({
  buttonText: 'שלום',
  loginUrl: 'https://www.haaretz.co.il/misc/login-page',
  logout: 'התנתקות',
  menuItems: Object.freeze([
    Object.freeze({
      name: 'הגדרות',
      url: 'https://www.haaretz.co.il/personal-area/my-account',
    }),
    Object.freeze({
      name: 'שירות למנויים',
      url: 'https://www.haaretz.co.il/personal-area/my-account',
    }),
    Object.freeze({
      name: 'ניוזלטרים',
      url: 'https://www.haaretz.co.il/personal-area/newsletter',
    }),
  ]),
  noUserData: 'התחברות',
});

export const a11yMenuI18n = Object.freeze({
  a11yToggle: state => `${state ? 'הפסק' : 'הפעל'} מצב ניגודיות`,
  menuItems: Object.freeze([
    Object.freeze({
      name: 'דווח על בעיית נגישות',
      url: 'mailto:accessibility@haaretz.co.il',
    }),
  ]),
});

export const zenTextI18n = 'קריאת זן';

export const readingListMenuI18n = Object.freeze({
  url: 'https://www.haaretz.co.il/personal-area/my-account#readingList',
});

export const serviceByMailI18n = Object.freeze({
  authorAlertServiceTitle: 'שלחו לי התראה על כל כתבה חדשה של ',
  inpEmailLabelText: 'דוא"ל',
  inpEmailNoteText: 'אנא הזינו כתובת אימייל',
  btnSubmitText: 'שלחו',
  btnCancelText: 'לא תודה',
  btnCloseText: 'סגור',

  inpEmailErrorRequired: 'יש להכניס כתובת דואר אלקטרוני',
  inpEmailErrorInvalid: 'כתובת דואר אלקטרוני אינה תקינה',

  successDefaultMessage: 'נרשמתך בהצלחה!',
  failureDefaultMessage: 'ההרשמה נכשלה, אנא נסה שנית מאוחר יותר.',
});

export const mobileAdditionalShare = Object.freeze({
  text: 'שיתוף',
});

export const mobileUserMenuI18n = Object.freeze({
  noUserData: 'כניסה',
  userLoggedIn: 'יציאה',
  url: 'https://www.haaretz.co.il/misc/login-page',
});

export const mobileReadingList = Object.freeze({
  url: 'https://www.haaretz.co.il/readingList',
  buttonText: 'רשימת הקריאה',
});

export const selectAriaLabel = Object.freeze({
  text: 'פתח תפריט',
});
export const recipeInstructionsI18n = Object.freeze({
  sectionTitle: 'הוראות הכנה',
});
export const recipeIngredientsI18n = Object.freeze({
  sectionTitle: 'רכיבים',
});


export const recipeRatingI18n = Object.freeze({
  levelText: Object.freeze({
    easy: 'קל',
    medium: 'בינוני',
    hard: 'קשה',
  }),
  highlightedText: Object.freeze({
    level: 'דרגת קושי',
    portions: 'מנות',
    time: 'זמן בישול',
  }),
  ratingTitle: 'דירוג הגולשים',
});

export const reviewRatingI18n = Object.freeze({
  ratingTitle: 'דירוג',
});

export const articleLayoutI18n = Object.freeze({
  commentSectionTitle: 'תגובות',
});
