/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';

class GoogleAnalyticsInit extends React.Component {
  static propTypes = {
    // Host url string passed to set GaHost ID
    host: PropTypes.string,
    // User type
    userType: PropTypes.string,
    // Set true to use enhanced ecommerce if needed
    withEC: PropTypes.bool,
    // Set true to Track pageView manually
    withPageView: PropTypes.bool,
  };
  static defaultProps = {
    host: null,
    userType: null,
    withEC: false,
    withPageView: false,
  };

  componentDidMount() {
    if (window && !window.GA_INITIALIZED) {
      this.initGA(this.props.host, this.props.userType, this.props.withEC);
      window.GA_INITIALIZED = true;
    }
    trackPage(
      window.location.pathname + window.location.search,
      this.props.withPageView
    );
  }

  initGA = (host, userType, withEC) => {
    const GaHost =
      this.props.host === 'themarker.com' ? 'UA-3574867-1' : 'UA-589309-3';
    const visitor =
      userType === 'anonymous'
        ? 'Non-registered'
        : userType === 'registered' ? 'Registered' : 'Paying';
    ReactGA.initialize(GaHost, {
      gaOptions: {
        userId: visitor,
        allowLinker: true,
        cookieDomain: host,
      },
    });
    if (withEC) {
      ReactGA.ga('require', 'ec');
    }
  };

  render() {
    return null;
  }
}

function trackPage(page, withPageView) {
  ReactGA.set({
    page,
  });
  if (withPageView) {
    ReactGA.pageview(page);
  }
}

export default GoogleAnalyticsInit;
