import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import { parseComponentProp, } from '@haaretz/htz-css-tools';
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
  marginBottom: PropTypes.oneOfType([
    /**
     * simple fela style object.
     */
    PropTypes.shape({
      marginBottom: PropTypes.string,
    }),
    /**
     * multiple objects, each for a different break.
     */
    PropTypes.shape({
      break: PropTypes.shape({
        marginBottom: PropTypes.string,
      }),
      break2: PropTypes.shape({
        marginBottom: PropTypes.string,
      }),
    }),
  ]),
};

const defaultProps = {
  marginBottom: null,
};

const relatedArticlesWrapperStyle = ({ theme, marginBottom, }) => ({
  ...(marginBottom || []),
});
const RelatedArticlesWrapper = createComponent(
  relatedArticlesWrapperStyle,
  'ul'
);

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

const RelatedArticles = ({ articles, marginBottom, }) => (
  <RelatedArticlesWrapper marginBottom={marginBottom}>
    {articles.map((article, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <ArticleWrapper key={i} lastItem={i === articles.length - 1}>
        <ArticleLink article={article} />
      </ArticleWrapper>
    ))}
  </RelatedArticlesWrapper>
);

RelatedArticles.propTypes = propTypes;
RelatedArticles.defaultProps = defaultProps;

export default RelatedArticles;
