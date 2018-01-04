import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import { parseComponentProp, } from '@haaretz/htz-css-tools';
import { internationalization, } from '@haaretz/htz-theme';
import ArticleLink from './articleLink';

const propTypes = {
  /**
   * The name of the series to display.
   */
  seriesTitle: PropTypes.string.isRequired,
  /**
   * The position of the current article in this series.
   */
  articlePositionInTheSeries: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  /**
   * An array of article objects.
   */
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Article title to display.
       */
      contentName: PropTypes.string.isRequired,
      /**
       * Article's destination.
       */
      url: PropTypes.string.isRequired,
      /**
       * Its position in this series.
       */
      positionInSeries: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
      /**
       * An array of Article's authors (if more than one, only the first will be displayed).
       */
      authors: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.object,
        ])
      ).isRequired,
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

const wrapperStyle = ({ theme, marginBottom, }) => ({
  ...(marginBottom || []),
});
const ArticleListWrapper = createComponent(wrapperStyle);

const seriesTitleStyle = ({ theme, }) => ({
  ...(theme.type(0)),
  color: theme.color('neutral', '-1'),
  display: 'inline',
  marginEnd: '1rem',
  ':after': {
    content: '":"',
  }
});
const SeriesTitle = createComponent(seriesTitleStyle, 'h4');

const articleWrapperStyle = ({ theme, lastItem, }) => ({
  display: 'inline',
  color: theme.color('primary', '+1'),
  ...(!lastItem &&
    {
      ':after': {
        content: '"|"',
        marginStart: '0.75rem',
        marginEnd: '0.75rem',
        fontWeight: '700',
        color: theme.color('neutral', '-1'),
      },
    }),
});
const ArticleWrapper = createComponent(articleWrapperStyle, 'li');

function LinksBlock({ seriesTitle, articlePositionInTheSeries, articles, marginBottom, }) {
  const { titlePrefix, } = internationalization.seriesArticle;
  return (
    <ArticleListWrapper marginBottom={marginBottom}>
      <SeriesTitle>{titlePrefix + seriesTitle}</SeriesTitle>
      {articles.map((article, i) => (
        articlePositionInTheSeries !== i+1 &&
        <ArticleWrapper key={i} lastItem={i === articles.length - 1}>
          <ArticleLink article={article} isBlock />
        </ArticleWrapper>
      ))}
    </ArticleListWrapper>
  );
}

LinksBlock.propTypes = propTypes;
LinksBlock.defaultProps = defaultProps;

export default LinksBlock;
