import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, FelaComponent, } from 'react-fela';
import { Query, } from 'react-apollo';
import gql from 'graphql-tag';
import ArticleLink from './articleLink';

const GET_ARTICLE_ID = gql`
  query {
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

const seriesTitleStyle = ({ theme, }) => ({
  ...theme.type(0),
  color: theme.color('neutral', '-1'),
  display: 'inline',
  marginEnd: '1rem',
  ':after': {
    content: '":"',
  },
});
const SeriesTitle = createComponent(seriesTitleStyle, 'h4');

const articleWrapperStyle = ({ theme, lastItem, }) => ({
  display: 'inline',
  color: theme.color('primary', '+1'),
  ...(!lastItem && {
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

function LinksBlock({ seriesTitle, articles, marginBottom, }) {
  return (
    <FelaComponent
      style={{ ...(marginBottom || []), }}
      render={({
        className,
        theme: {
          seriesArticleI18n: { titlePrefix, },
        },
      }) => (
        <div className={className}>
          <SeriesTitle>{titlePrefix + seriesTitle}</SeriesTitle>
          <Query query={GET_ARTICLE_ID}>
            {({ data: { articleId, }, }) =>
              articles.map(
                (article, i) =>
                  articleId !== article.contentId && (
                    <ArticleWrapper
                      key={i} // eslint-disable-line react/no-array-index-key
                      lastItem={i === articles.length - 1}
                    >
                      <ArticleLink article={article} isBlock />
                    </ArticleWrapper>
                  )
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
