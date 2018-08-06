import React from 'react';
import PropTypes from 'prop-types';
import { FelaTheme, } from 'react-fela';

import Media from '../Media/Media';
import Osaka from './Osaka';
import LayoutContainer from '../PageLayout/LayoutContainer'; // eslint-disable-line import/no-named-as-default

const propTypes = {
  articles: PropTypes.shape({}).isRequired,
  articleParent: PropTypes.shape({}).isRequired,
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
    return (
      <Media
        query={{ from: 'm', }}
        render={() => {
          const shouldDisplay = this.state.display;
          const {
            articles,
            articleParent: { name: sectionName, url: sectionUrl, },
          } = this.props;
          return (
            <FelaTheme
              render={theme => {
                let nextArticleUrl;
                let nextArticleText;
                if (sectionUrl) {
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
                    <Osaka
                      nextArticleUrl={nextArticleUrl}
                      nextArticleText={nextArticleText}
                      sectionName={sectionName}
                      lists={{ ...articles, }}
                    />
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
