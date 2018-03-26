export const benderStyle = Object.freeze({
  mainTitle: Object.freeze({
    level: 2,
    text: 'כתבות שאולי פספסתם',
    fontSize: [ { until: 'm', value: 1, }, { from: 'm', value: 2, }, ],
  }),
  title: Object.freeze({
    level: 4,
    fontSize: [
      { until: 'm', value: -2, },
      { from: 'm', until: 'l', value: -1, },
      { from: 'l', value: 0, },
    ],
  }),
  image: Object.freeze({
    aspect: 'vertical',
    width: '400',
    quality: 'auto',
  }),
});
