import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, FelaComponent, } from 'react-fela';
import gql from 'graphql-tag';
import { parseStyleProps, } from '@haaretz/htz-css-tools';
import { stylesPropType, } from '../../propTypes/stylesPropType';
import Query from '../ApolloBoundary/Query';
import ArticleLink from './articleLink';
import H from '../AutoLevels/H';

const GET_ARTICLE_ID = gql`
  query GetArticleId {
    articleId @client
  }
`;

const propTypes = {
  /**
   * The name of the series to display.
   */
  seriesTitle: PropTypes.string.isRequired,
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
      url: PropTypes.string.isRequired,
      /**
       * An array of Article's authors (if more than one, only the first will be displayed).
       */
      authors: PropTypes.arrayOf(
        PropTypes.oneOfType([ PropTypes.string, PropTypes.object, ])
      ).isRequired,
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

const seriesTitleStyle = ({ theme, }) => ({
  ...theme.type(0),
  color: theme.color('neutral', '-1'),
  display: 'inline',
  marginEnd: '1rem',
  ':after': {
    content: '":"',
  },
});
const SeriesTitle = createComponent(seriesTitleStyle, H);

const articleWrapperStyle = ({ theme, lastItem, }) => ({
  display: 'inline',
  color: theme.color('primary', '+1'),
  ...(!lastItem
    ? {
      ':after': {
        content: '"|"',
        marginStart: '0.75rem',
        marginEnd: '0.75rem',
        fontWeight: '700',
        color: theme.color('neutral', '-1'),
      },
    }
    : {}),
});
const ArticleWrapper = createComponent(articleWrapperStyle, 'li');

function LinksBlock({ seriesTitle, articles, miscStyles, }) {
  return (
    <FelaComponent
      style={theme => ({
        extend: [
          ...(miscStyles
            ? parseStyleProps(miscStyles, theme.mq, theme.type)
            : []),
        ],
      })}
      render={({
        className,
        theme: {
          seriesArticleI18n: { titlePrefix, },
        },
      }) => (
        <div className={className}>
          <SeriesTitle>{titlePrefix + seriesTitle}</SeriesTitle>
          <Query query={GET_ARTICLE_ID}>
            {({ data: { articleId, }, }) => articles.map(
              (article, i) => (articleId !== article.contentId ? (
                <ArticleWrapper
                  key={i} // eslint-disable-line react/no-array-index-key
                  lastItem={i === articles.length - 1}
                >
                  <ArticleLink article={article} isBlock />
                </ArticleWrapper>
              ) : null)
            )
            }
          </Query>
        </div>
      )}
    />
  );
}

LinksBlock.propTypes = propTypes;
LinksBlock.defaultProps = defaultProps;

export default LinksBlock;
