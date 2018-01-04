import color from '../methods/getColor';

const articleStyle = Object.freeze({
  body: Object.freeze({
    marginBottom: [
      { until: 'xl', value: '4rem', },
      { from: 'xl', value: '3.5rem', },
      { until: 'xl', value: '3.5rem', },
      { from: 'xl', value: '4rem', },
    ],
  }),
  paragraphStyles: Object.freeze({
  }),
  paragraphLink: Object.freeze({
    color: color('link', 'base'),
    ':hover': {
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: color('link', 'base'),
    },
    ':focus': {
      borderBottomWidth: '2px',
      borderBottomStyle: 'solid',
      borderBottomColor: color('link', 'base'),
    },
  }),
});

export default articleStyle;
