import color from '../methods/getColor';
import type from '../methods/typesetter';
import { getDuration, getTimingFunction, } from '../methods/animation';

const article = Object.freeze({
  marginStart: [
    { until: 'l', value: '0', },
    { from: 'l', until: 'xl', value: '27rem', },
    { from: 'xl', value: '30rem', },
  ],
  marginEnd: [
    { until: 'l', value: '0', },
    { from: 'l', until: 'xl', value: '57rem', },
    { from: 'xl', value: '51rem', },
  ],
});

const paragraphLink = Object.freeze({
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomWidthActive: '2px',
});

const linksBlockLink = Object.freeze({
  ...paragraphLink,
  ...type(-1),
  fontWeight: '700',
});

const body = Object.freeze({
  marginBottom: [ { until: 'xl', value: '4rem', }, { from: 'xl', value: '3rem', }, ],
  width: [
    { from: 's', until: 'l', value: '80rem', },
    { from: 'l', until: 'xl', value: '70.5rem', },
    { from: 'xl', value: '80rem', },
  ],
  margin: [ { from: 's', until: 'l', value: 'auto', }, ],
  marginStart: [ { until: 's', value: '2rem', }, { from: 'l', value: '4rem', }, ],
  marginEnd: [ { until: 's', value: '2rem', }, ],
});

const paragraphStyles = Object.freeze({});

const relatedArticlesLink = Object.freeze({
  ...type(-1),
  marginBottom: [ { until: 'xl', value: '3rem', }, { from: 'xl', value: '2rem', }, ],
  fontWeight: '700',
  position: 'relative',
  zIndex: '1',
  color: color('primary', '+1'),
  transitionProperty: 'background-position',
  ...getDuration('transition', -1),
  ...getTimingFunction('transition', 'swiftIn'),
  backgroundImage: `linear-gradient(to bottom, transparent 36%, ${color(
    'quaternary',
    '-2'
  )}, ${color('quaternary', '-2')} 50%, ${color('quaternary', '-2')} )`,
  backgroundSize: '100% 200%',
  backgroundPosition: '0 0',
  ':hover': {
    ...getTimingFunction('transition', 'swiftOut'),
    backgroundPosition: '0 100%',
  },
  ':focus': {
    background: 'none',
    backgroundColor: color('quaternary'),
  },
});

const currentArticleInSeries = Object.freeze({
  ...type(-1),
  fontWeight: '700',
  backgroundColor: color('quaternary', '-2'),
});

/**
 * Contains theme for article header elements: kicker, title
 * @type {Object}
 */
const header = Object.freeze({
  bylineFontSize: [
    { until: 's', value: -2, },
    { from: 's', until: 'l', value: -1, },
    { from: 'l', until: 'xl', value: 0, },
    { from: 'xl', value: -1, },
  ],
  marginStart: [ { until: 'l', value: '2rem', }, { from: 'l', value: '4rem', }, ],
  marginEnd: [
    { until: 'm', value: '2rem', },
    { from: 'm', until: 'l', value: '2rem', },
  ],
});

const articleStyle = Object.freeze({
  article,
  header,
  body,
  paragraphStyles,
  paragraphLink,
  relatedArticlesLink,
  currentArticleInSeries,
  linksBlockLink,
});

export default articleStyle;
