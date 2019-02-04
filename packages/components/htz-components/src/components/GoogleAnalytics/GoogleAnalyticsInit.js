/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';

class GoogleAnalyticsInit extends React.Component {
  static propTypes = {
    // GaHost ID
    GaHost: PropTypes.string,
    // Host url string
    host: PropTypes.string,
    // User type
    userType: PropTypes.string,
    // Set true to use enhanced ecommerce if needed
    withEC: PropTypes.bool,
    // Set true to Track pageView manually
    withPageView: PropTypes.bool,
  };

  static defaultProps = {
    GaHost: null,
    host: null,
    userType: null,
    withEC: false,
    withPageView: false,
  };

  componentDidMount() {
    if (window && !window.GA_INITIALIZED) {
      this.initGA(this.props.host, this.props.userType, this.props.withEC, this.props.GaHost);
      window.GA_INITIALIZED = true;
    }
    trackPage(window.location.pathname + window.location.search, this.props.withPageView);
  }

  initGA = (host, userType, withEC, GaHost) => {
    // todo: remove this if the autolinker works correctly in production.
    // let clientTrackerId;
    // ReactGA.ga(tracker => {
    //   clientTrackerId = tracker.get('clientId');
    //   console.log('clientId : ', clientTrackerId);
    // });
    const visitor = userType === 'anonymous'
      ? 'Non-registered'
      : userType === 'registered'
        ? 'Registered'
        : 'Paying';
    ReactGA.initialize(GaHost, {
      gaOptions: {
        userId: visitor,
        allowLinker: true,
        // siteSpeedSampleRate: 100,
        // todo: remove this if the autolinker works correctly in production.
        // ...(clientTrackerId ? { clientId: clientTrackerId, } : null),
        cookieDomain: host,
      },
    });
    // requiring linker ga util to track the clientId.
    ReactGA.ga('require', 'linker');
    // linking the _ga clientId from the cookie to the purchase page
    ReactGA.ga('linker:autoLink', [ 'haaretz.co.il', 'themarker.com', ]);

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
