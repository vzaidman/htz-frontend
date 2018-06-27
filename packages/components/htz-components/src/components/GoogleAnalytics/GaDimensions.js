/* global window */
import React from 'react';
import ReactGA from 'react-ga';
import PropTypes from 'prop-types';

class GaDimensions extends React.Component {
  static propTypes = {
    // The paywall blocking level of the article
    articlePaywallMode: PropTypes.string,
    // Array of article's author/s
    authors: PropTypes.arrayOf(PropTypes.shape({})),
    // Page type
    pageType: PropTypes.string,
    // User type
    userType: PropTypes.string,
  };
  static defaultProps = {
    articlePaywallMode: null,
    authors: null,
    pageType: null,
    userType: null,
  };

  componentDidMount() {
    const { articlePaywallMode, authors, pageType, userType, } = this.props;
    if (userType) {
      const visitor =
        userType === 'anonymous'
          ? 'Non-registered'
          : userType === 'registered' ? 'Registered' : 'Paying';
      ReactGA.ga('set', 'dimension1', visitor);
    }
    authors && ReactGA.ga('set', 'dimension2', authors);
    articlePaywallMode && ReactGA.ga('set', 'dimension3', articlePaywallMode);
    pageType && ReactGA.ga('set', 'dimension4', pageType);
  }

  render() {
    return null;
  }
}

export default GaDimensions;
