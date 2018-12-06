// @flow
import React from 'react';
import ReactGA from 'react-ga';

const trackPage: string => void = page => {
  ReactGA.set({
    page,
  });
  ReactGA.pageview(page);
};

export default class GoogleAnalytics extends React.Component<{}> {
  componentDidMount() {
    if (window && !window.GA_INITIALIZED) {
      this.initGA();
      window.GA_INITIALIZED = true;
    }
    trackPage(window.location.pathname + window.location.search);
  }

  initGA: () => void = () => {
    const GaHost: string = 'UA-39927280-1';
    ReactGA.initialize(GaHost);
  };

  render() {
    return null;
  }
}
