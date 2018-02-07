const seriesArticle = Object.freeze({
  loadButton: Object.freeze({
    close: 'טען את כל הכתבות בסדרה',
    open: 'סגירת הרשימה',
    ariaText: (x) => (`נוספו ${x} כתבות`)
  }),
  titlePrefix: 'סדרת כתבות: ',
});

const tagsElement = Object.freeze({
  prefix: 'תגיות:',
});

export default { tagsElement, seriesArticle, };
