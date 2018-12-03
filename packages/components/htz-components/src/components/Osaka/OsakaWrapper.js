/* global window */
/* global sessionStorage */
import React from 'react';
import PropTypes from 'prop-types';
import { FelaTheme, } from 'react-fela';

import Media from '../Media/Media';
import Osaka from './Osaka';
import LayoutContainer from '../PageLayout/LayoutContainer';
import { nextArticle, } from './queries/getData';
import Query from '../ApolloBoundary/Query';
import getTransitionEnd from '../../utils/getTransitionEnd';

const propTypes = {
  articles: PropTypes.shape({}).isRequired,
  articleSection: PropTypes.shape({}).isRequired,
  /**
   * apollo client object
   */
  client: PropTypes.shape({ writeData: PropTypes.func, }).isRequired,
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

  componentDidMount() {
    if(this.wrapperEl) {
      this.wrapperEl.addEventListener(
        getTransitionEnd(this.wrapperEl),
        this.removeOsaka.bind(this),
        false
      );
    }
  }

  shouldComponentUpdate(nextProps) {
    return (nextProps.velocity > 0 && nextProps.y > 0) !== this.state.display;
  }

  componentWillUpdate(nextProps) {
    // eslint-disable-next-line react/no-will-update-set-state
    const display = nextProps.velocity > 0 && nextProps.y > 0;
    if (this.wrapperEl && display) {
      this.wrapperEl.style.display = 'block';
    }
    window.setTimeout(
      () =>
        this.setState({ display, }, () => {
          this.props.client.writeData({
            data: { isOsakaDisplayed: this.state.display, },
          });
        }),
      50
    );
  }

  removeOsaka() {
    if (!this.state.display) {
      this.wrapperEl.style.display = 'none';
    }
  }

  render() {
    const readingHistory = JSON.parse(sessionStorage.getItem('readingHistory'));
    return (
      <Media
        query={{ from: 'm', }}
        render={() => {
          const shouldDisplay = this.state.display;
          const {
            articles,
            articleSection: {
              name: sectionName,
              url: sectionUrl,
              id: sectionId,
            },
          } = this.props;
          return (
            <FelaTheme
              render={theme => {
                let nextArticleUrl = '/';
                let nextArticleText = theme.osakaI18n.backToHome;
                return (
                  <LayoutContainer
                    attrs={{
                      ref: el => {
                        this.wrapperEl = el;
                      },
                    }}
                    miscStyles={{
                      backgroundColor: 'transparent',
                      display: 'none',
                      transform: `translate(50%, ${
                        shouldDisplay ? '0%' : '-105%'
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
                    {sectionId ? (
                      <Query
                        query={nextArticle}
                        variables={{
                          sectionId,
                          readingHistory,
                        }}
                      >
                        {({ loading, error, data, }) => {
                          if (loading || error) return null;
                          const {
                            nextArticle: { result: articleUrl, },
                          } = data;

                          if (articleUrl) {
                            nextArticleUrl = articleUrl;
                            nextArticleText = `${
                              theme.osakaI18n.nextArticle
                            } ${sectionName}`;
                          }
 else if (sectionUrl) {
                            nextArticleUrl = sectionUrl;
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
                              lists={{ ...articles, }}
                            />
                          );
                        }}
                      </Query>
                    ) : (
                      <Osaka
                        nextArticleUrl={nextArticleUrl}
                        nextArticleText={nextArticleText}
                        lists={{ ...articles, }}
                      />
                    )}
                  </LayoutContainer>
                );
              }}
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
