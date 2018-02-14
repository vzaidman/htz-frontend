const mockTheme = {
  // Constants
  bps: Object.freeze({
    widths: Object.freeze({
      s: 600,
      m: 768,
      l: 1024,
      xl: 1280,
    }),
    misc: Object.freeze({
      landscape: '(orientation: landscape)',
      portrait: '(orientation: portrait)',
      hidpi: '(min-resolution: 1.5dppx)',
    }),
  }),
  btnStyle: Object.freeze({
    // Border width
    borderBottomWidth: 1,
    borderEndWidth: 1,
    borderStartWidth: 1,
    borderTopWidth: 1,

    // Border style
    borderBottomStyle: 'solid',
    borderEndStyle: 'solid',
    borderStartStyle: 'solid',
    borderTopStyle: 'solid',
    radius: 0,
    boxModel: { hp: 4, vp: 1, },

    // Font Style
    fontWeight: 'bold',
  }),
  commentsStyle: Object.freeze({
    textInputVariant: 'primary',
  }),
  inputStyle: Object.freeze({
    borderWidth: 1,
    lines: 1,
    borderStyle: 'solid',
    radius: 0,
    height: 6,
    // typographic Scale from theme
    typeScale: -1,
    fontWeightLabel: 'bold',
  }),
  selectStyle: Object.freeze({
    borderWidth: 1,
    lines: 0,
    borderStyle: 'solid',
  }),
  typeConf: Object.freeze({
    default: Object.freeze({
      base: 16,
      minPadding: 2,
      ratio: 2,
      rhythmUnit: 6,
      steps: 5,
    }),
    xl: Object.freeze({
      base: 18,
      minPadding: 2,
      ratio: 2,
      rhythmUnit: 7,
      steps: 5,
    }),
  }),

  commentI18n: Object.freeze({
    tags: Object.freeze({
      editorsPick: 'בחירת העורכים',
      usersPick: 'בחירת הגולשים',
    }),
    buttons: Object.freeze({
      readMoreBtnTxt: 'קרא עוד',
      replyBtnTxt: 'הגב',
      reportAbuseBtnTxt: 'דווח כפוגעני',
    }),
  }),

  commentFormI18n: Object.freeze({
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
  }),
  commentSentI18n: Object.freeze({
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
  }),
  commentsSectionI18n: Object.freeze({
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
  }),

  // Methods
  color: () => 'red',
  getTransition: () => ({
    transitionDuration: undefined,
    transitionTimingFunction: undefined,
    transitionDelay: undefined,
  }),
  mq: () => () => ({
    '@media (min-width: 37.5em) and (max-width: 64em)': {
      color: 'red',
    },
  }),
  type: () => () => ({}),
};

export default mockTheme;
