import color from '../methods/getColor';
import type from '../methods/typesetter';
import { getDuration, getTimingFunction, } from '../methods/animation';

const article = Object.freeze({
  width: [
    { until: 'm', value: '100%', },
    { from: 'l', until: 'xl', value: `${520 / 6}rem`, },
    { from: 'xl', value: '100rem', },
  ],
});

const aside = Object.freeze({
  width: [
    { until: 'm', value: '0', },
    { from: 'l', until: 'xl', value: '27rem', },
    { from: 'xl', value: '30rem', },
  ],
});

const paragraphLink = Object.freeze({
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
});

const linksBlockLink = Object.freeze({
  ...paragraphLink,
  ...type(-1),
  fontWeight: '700',
});

const body = Object.freeze({
  marginBottom: [ { until: 'xl', value: '4rem', }, { from: 'xl', value: '3rem', }, ],
  width: [
    { until: 'm', value: '49.3rem', },
    { from: 'm', until: 'l', value: '80rem', },
    { from: 'l', until: 'xl', value: '70.5rem', },
    { from: 'xl', value: '80rem', },
  ],
});

const paragraphStyles = Object.freeze({});

const inlineKicker = {
  backgroundColor: 'transparent',
  color: color('tertiary'),
  separator: '|',
};

const blockKicker = {
  backgroundColor: color('tertiary'),
  color: color('neutral', '-10'),
};

const relatedArticlesLink = Object.freeze({
  ...type(-1),
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
  inlineKicker,
  blockKicker,
  titleFontSize: [
    { until: 'm', value: 3, },
    { from: 'm', until: 'l', value: 4, },
    { from: 'l', value: 5, },
  ],
  subtitleFontSize: [ { until: 'xl', value: 0, }, { from: 'xl', value: 1, }, ],
  bylineCreditColor: color('primary', '+1'),
  bylineFontSize: [
    { until: 'm', value: -2, },
    { from: 'm', until: 'l', value: -1, },
    { from: 'l', value: -1, },
  ],
});

const articleStyle = Object.freeze({
  article,
  aside,
  header,
  body,
  paragraphStyles,
  paragraphLink,
  relatedArticlesLink,
  currentArticleInSeries,
  linksBlockLink,
});

export default articleStyle;
