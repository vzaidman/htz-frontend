/* global sessionStorage */
import React from 'react';
import PropTypes from 'prop-types';
import { FelaTheme, } from 'react-fela';

import Media from '../Media/Media';
import Osaka from './Osaka';
import LayoutContainer from '../PageLayout/LayoutContainer';
import { fromSolr, } from './queries/getData';
import { Query, } from '../ApolloBoundary/ApolloBoundary';

const propTypes = {
  articles: PropTypes.shape({}).isRequired,
  articleId: PropTypes.string.isRequired,
  articleParent: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  /**
   * The scroll speed and direction (Y axis), as brought to us by: [`Scroll`](./#scroll)
   */
  velocity: PropTypes.number,
  y: PropTypes.number,
};

const defaultProps = {
  velocity: null,
  y: 0,
};

class OsakaWrapper extends React.Component {
  state = {
    display: false,
  };

  shouldComponentUpdate(nextProps) {
    return (nextProps.velocity > 0 && nextProps.y > 0) !== this.state.display;
  }

  componentWillUpdate(nextProps) {
    // eslint-disable-next-line react/no-will-update-set-state
    this.setState({ display: nextProps.velocity > 0 && nextProps.y > 0, });
  }

  render() {
    const userReadingHistory = JSON.parse(
      sessionStorage.getItem('readingHistory')
    );
    return (
      <Media
        query={{ from: 'm', }}
        render={() => {
          const shouldDisplay = this.state.display;
          const {
            articles,
            articleId,
            articleParent: { name: sectionName, id: sectionId, },
          } = this.props;
          return (
            <FelaTheme
              render={theme => (
                <LayoutContainer
                  miscStyles={{
                    backgroundColor: 'transparent',
                    transform: `translate(50%, ${
                      shouldDisplay ? '0%' : 'calc(-2px - 100%)'
                    })`,
                    transitionProperty: 'transform',
                    ...theme.getDelay('transition', -1),
                    ...theme.getDuration('transition', -1),
                    ...theme.getTimingFunction('transition', 'linear'),
                    position: 'fixed',
                    start: '50%',
                    top: '0',
                    width: '100%',
                    zIndex: '6',
                  }}
                >
                  <Query
                    query={fromSolr}
                    variables={{
                      query: `mainPage:${sectionId}`,
                      filterQuery: userReadingHistory.map(
                        contentId => `-contentId:${contentId}`
                      ),
                      sortBy: 'publishingDate',
                      desc: true,
                      numOfResults: 1,
                      fields: [ 'articleCanonicalLink', ],
                      articleId,
                    }}
                  >
                    {({ loading, error, data, }) => {
                      if (loading || error) return null;
                      const {
                        solrQuery: { response: { docs, }, },
                        page: { lineage, },
                      } = data;
                      let nextArticleUrl;
                      let nextArticleText;
                      if (docs.length > 0) {
                        nextArticleUrl = docs[0].articleCanonicalLink;
                        nextArticleText = `${
                          theme.osakaI18n.nextArticle
                        } ${sectionName}`;
                      }
 else if (lineage[1]) {
                        nextArticleUrl = lineage[1].url;
                        nextArticleText = `${
                          theme.osakaI18n.backToSection
                        } ${sectionName}`;
                      }
 else {
                        nextArticleUrl = '/';
                        nextArticleText = theme.osakaI18n.backToHome;
                      }
                      return (
                        <Osaka
                          nextArticleUrl={nextArticleUrl}
                          nextArticleText={nextArticleText}
                          sectionName={sectionName}
                          lists={{ ...articles, }}
                        />
                      );
                    }}
                  </Query>
                </LayoutContainer>
              )}
            />
          );
        }}
      />
    );
  }
}

OsakaWrapper.propTypes = propTypes;
OsakaWrapper.defaultProps = defaultProps;

export default OsakaWrapper;
