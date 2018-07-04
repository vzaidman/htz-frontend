import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, FelaComponent, } from 'react-fela';
import { parseComponentProp, parseStyleProps, } from '@haaretz/htz-css-tools';
import { stylesPropType, } from '../../propTypes/stylesPropType';
import ArticleLink from './articleLink';

const propTypes = {
  /**
   * An array of article objects.
   */
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Article title to display.
       */
      title: PropTypes.string.isRequired,
      /**
       * Article's destination.
       */
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
  /**
   * Should be passed if the component should have a MarginBottom style.
   */
  /**
   * A special property holding miscellaneous CSS values that
   * trump all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
};

const defaultProps = {
  miscStyles: null,
};

const articleWrapperStyle = ({ theme, lastItem, }) => ({
  marginInlineStart: '1em',
  position: 'relative',
  color: theme.color('primary', '+1'),
  ...(!lastItem
    ? {
      ...parseComponentProp(
        'marginBottom',
        theme.articleStyle.body.marginBottom,
        theme.mq,
        (prop, value) => ({ [prop]: value, })
      ),
    }
    : {}),
  ':before': {
    ...theme.type(-1),
    content: '"\\25cf"',
    position: 'absolute',
    start: '0',
    top: '0',
    transform: 'translate(150%, 20%)',
  },
});
const ArticleWrapper = createComponent(articleWrapperStyle, 'li');

const RelatedArticles = ({ articles, miscStyles, }) => (
  <FelaComponent
    style={theme => ({
      extend: [
        ...(miscStyles
          ? parseStyleProps(miscStyles, theme.mq, theme.type)
          : []),
      ],
    })}
    render="ul"
  >
    {articles.map((article, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <ArticleWrapper key={i} lastItem={i === articles.length - 1}>
        <ArticleLink article={article} />
      </ArticleWrapper>
    ))}
  </FelaComponent>
);

RelatedArticles.propTypes = propTypes;
RelatedArticles.defaultProps = defaultProps;

export default RelatedArticles;
