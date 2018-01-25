import color from '../methods/getColor';
import type from '../methods/typesetter';
import { getDelay, getDuration, getTimingFunction, } from '../methods/animation';

const articleStyle = Object.freeze({
  body: Object.freeze({
    marginBottom: [
      { until: 'xl', value: '4rem', },
      { from: 'xl', value: '3rem', },
    ],
    width: [
      { until: 'm', value: '49.3rem', },
      { from: 'm', until: 'l', value: '80rem', },
      { from: 'l', until: 'xl', value: '70.5rem', },
      { from: 'xl', value: '80rem', },
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
  relatedArticlesLink: Object.freeze({
    ...(type(-1)),
    fontWeight: '700',
    position: 'relative',
    zIndex: '1',
    color: color('primary', '+1'),
    transitionProperty: 'background-position',
    ...(getDuration('transition', -1)),
    ...(getTimingFunction('transition', 'swiftIn')),
    backgroundImage: `linear-gradient(to bottom, transparent 36%, ${color('quaternary', '-2')}, ${color('quaternary', '-2')} 50%, ${color('quaternary', '-2')} )`,
    backgroundSize: '100% 200%',
    backgroundPosition: '0 0',
    ':hover': {
      ...(getTimingFunction('transition', 'swiftOut')),
      backgroundPosition: '0 100%',
    },
    ':focus': {
      background: 'none',
      backgroundColor: color('quaternary'),
    },
  }),
  activeArticleInSeries: Object.freeze({
    ...(type(-1)),
    fontWeight: '700',
    backgroundColor: color('quaternary', '-2'),
  }),
});

export default articleStyle;
