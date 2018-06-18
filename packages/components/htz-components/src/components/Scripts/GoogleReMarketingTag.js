/* eslint-disable */
import React, { Component } from 'react';
import { appendScript } from '../../utils/scriptTools';

class GoogleReMarketingTag extends Component {
  componentDidMount() {
    appendScript({
      src: 'https://www.googletagmanager.com/gtag/js?id=AW-955543703',
      id: 'google-remarketing-tag',
      isAsync: true,
      onLoadFunction: this.initScript,
    });
  }

  initScript = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'AW-955543703');
  };

  render() {
    return null;
  }
}

export default GoogleReMarketingTag;
