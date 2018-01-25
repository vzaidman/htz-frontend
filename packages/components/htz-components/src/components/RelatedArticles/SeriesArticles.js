import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import { parseComponentProp, } from '@haaretz/htz-css-tools';
import { internationalization, } from '@haaretz/htz-theme';
import ArticleLink from './articleLink';
import Button from '../Button/Button';

const propTypes = {
  seriesTitle: PropTypes.string.isRequired,
  articlePositionInTheSeries: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  usePagination: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]).isRequired,
  itemsPerPage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      contentName: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      positionInSeries: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
      inputTemplate: PropTypes.string,
      contentId: PropTypes.string,
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
  itemsPerPage: 3,
  marginBottom: null,
};

const seriesArticlesWrapperStyle = ({ theme, marginBottom, }) => ({
  ...(marginBottom || []),
});

const SeriesArticlesWrapper = createComponent(seriesArticlesWrapperStyle);

const seriesTitleStyle = ({ theme, }) => ({
  ...(theme.type(0)),
  color: theme.color('neutral', '-1'),
  fontWeight: '700',
  marginBottom: '1rem',
});

const SeriesTitle = createComponent(seriesTitleStyle, 'p');

const articleListWrapperStyle = ({ theme, }) => ({
  transitionProperty: 'height',
  ...(theme.getDelay('transition', -1)),
  ...(theme.getDuration('transition', -1)),
  ...(theme.getTimingFunction('transition', 'linear')),
  marginBottom: '3rem',
});

const ArticleListWrapper = createComponent(articleListWrapperStyle, 'ul', props => Object.keys(props));

const articleWrapperStyle = ({ theme, lastItem, current, }) => ({
  marginInlineStart: '1em',
  position: 'relative',
  color: theme.color('primary', '+1'),
  ...(!lastItem ?
    {
      ...parseComponentProp(
        'marginBottom',
        theme.articleStyle.body.marginBottom,
        theme.mq,
        (prop, value) => ({ [prop]: value, })
      ),
      ':after': {
        content: '""',
        position: 'absolute',
        start: '0',
        top: '1.5em',
        height: 'calc(100%)',
        transform: 'translate(485%, 0%)',
        borderWidth: '1.2px',
        borderStyle: 'solid',
        borderColor: theme.color('primary', '-1'),
      },
    }
    :
    {}),
  ':before': {
    content: '"\\25cf"',
    position: 'absolute',
    start: '0',
    top: '0',
    transform: 'translate(150%)',
    color: theme.color('primary', '-1'),
  },
});
const ArticleWrapper = createComponent(articleWrapperStyle, 'li');

const Undisplayed = createComponent(() => ({ display: 'none', }), 'span');

export default class SeriesArticles extends React.Component {
  componentWillMount() {
    const { articles, usePagination, itemsPerPage, } = this.props;
    const pagination = (articles.length > 3 && !(!usePagination || (usePagination && usePagination === 'false')) && articles.length > +itemsPerPage);
    const perPage = +itemsPerPage || 3;
    const articlesToDisplay = pagination ? this.props.articles.slice(0, perPage) : articles;
    const articlePosition = +this.props.articlePositionInTheSeries;
    const remainingArticlesCount = articles.length - itemsPerPage;

    this.setState({
      usePagination: pagination,
      itemsPerPage: perPage,
      articlesToDisplay,
      articlePosition,
      remainingArticlesCount,
      isOpen: false,
    });
  }

  setArticlesToDisplay = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      articlesToDisplay:
        this.state.isOpen
          ?
          this.props.articles.slice(0, this.state.itemsPerPage)
          :
          this.props.articles,
    });
  };

  render() {
    const { loadButton } = internationalization.seriesArticle;
    return (
      <SeriesArticlesWrapper marginBottom={this.props.marginBottom}>
        <SeriesTitle>{this.props.seriesTitle}</SeriesTitle>
        <ArticleListWrapper  aria-live='polite'>
          {this.state.articlesToDisplay.map((article, i) => (
            <ArticleWrapper
              key={i}
              lastItem={i === this.state.articlesToDisplay.length - 1}
              current={this.state.articlePosition && +this.state.articlePosition === i + 1}
            >
              {
                this.state.isOpen &&
                this.state.itemsPerPage === i &&
                <Undisplayed>
                  {loadButton.ariaText(this.state.remainingArticlesCount)}
                </Undisplayed>
              }
              <ArticleLink
                article={article}
                currentArticle={this.state.articlePosition && +this.state.articlePosition === i + 1}
                focus={this.state.isOpen && this.state.itemsPerPage === i}
              />
            </ArticleWrapper>
          ))}
        </ArticleListWrapper>
        {
          this.state.usePagination &&
          <Button
            boxModel={{ hp: 3, vp: 1, }}
            miscStyles={{ type: -1, }}
            onClick={this.setArticlesToDisplay}
          >
            {this.state.isOpen ? loadButton.open : `${loadButton.close} ${this.state.remainingArticlesCount}`}
          </Button>
        }
        <script type="application/ld+json">
          {JSON.stringify({
            "@context":"http://schema.org",
            "@type":"ItemList",
            "itemListElement": [
              ...(this.props.articles.map((article, i) => ({
                "@type":"ListItem",
                "position":i + 1,
                "url":article.url,
              }))),
            ]
          })}
        </script>
      </SeriesArticlesWrapper>
    );
  }
}
SeriesArticles.propTypes = propTypes;
SeriesArticles.defaultProps = defaultProps;
