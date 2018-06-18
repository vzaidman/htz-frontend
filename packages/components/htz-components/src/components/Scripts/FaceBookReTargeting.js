/* eslint-disable */
import React, { Component } from 'react';

class FaceBookReTargeting extends Component {
  componentDidMount() {
    try {
      this.runScript();
    } catch (e) {
      console.log(`error facebook re marketing ${e}`);
    }
  }

  runScript = () => {
    (function() {
      var _fbq = window._fbq || (window._fbq = []);
      if (!_fbq.loaded) {
        var fbds = document.createElement('script');
        fbds.async = true;
        fbds.src = '//connect.facebook.net/en_US/fbds.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(fbds, s);
        _fbq.loaded = true;
      }
      _fbq.push(['addPixelId', '1465233127023021']);
    })();
    window._fbq = window._fbq || [];
    window._fbq.push(['track', 'PixelInitialized', {}]);
  };

  render() {
    return (
      <noscript>
        <img
          height="1"
          width="1"
          alt=""
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=1465233127023021&amp;ev=PixelInitialized"
        />
      </noscript>
    );
  }
}

export default FaceBookReTargeting;
