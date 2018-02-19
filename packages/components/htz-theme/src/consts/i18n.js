const seriesArticle = Object.freeze({
  loadButton: Object.freeze({
    close: 'טען את כל הכתבות בסדרה',
    open: 'סגירת הרשימה',
    ariaText: x => `נוספו ${x} כתבות`,
  }),
  titlePrefix: 'סדרת כתבות: ',
});

export default { seriesArticle, };

export const zoominText = 'הגדל';
export const zoomoutText = 'הקטן';

export const tagsElementI18n = Object.freeze({
  prefix: 'תגיות:',
});

export const osakaI18n = Object.freeze({
  nextArticle: 'לכתבה הבאה במדור',
  promotedContent: 'תוכן מקודם',
});

export const commentI18n = Object.freeze({
  tags: Object.freeze({
    editorsPick: 'בחירת העורכים',
    usersPick: 'בחירת הגולשים',
  }),
  buttons: Object.freeze({
    readMoreBtnTxt: 'קרא עוד',
    replyBtnTxt: 'הגב',
    reportAbuseBtnTxt: 'דווח כפוגעני',
  }),
});

export const commentFormI18n = Object.freeze({
  buttons: Object.freeze({
    sendBtnTxt: 'שלח',
    cancelBtnTxt: 'בטל',
    toggleUserBtnText: 'להוספת תגובה מזוהה לחץ כאן',
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
    loadAllCommentsBtnText: 'טען את כל התגובות',
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
});

export const footerMobileListsI18n = Object.freeze({
  ListOne: [
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
  ],
  ListTwo: [
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
});
