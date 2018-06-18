/* eslint-disable */
import React, { Component } from 'react';

class FaceBookReMarketing extends Component {
  componentDidMount() {
    try {
      this.runScript();
    } catch (e) {
      console.log(`error facebook re marketing ${e}`);
    }
  }

  runScript = () => {
    !(function(f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function() {
        n.callMethod ? n.callMethod(...arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', '//connect.facebook.net/en_US/fbevents.js');

    fbq('init', '801998859871552');
    fbq('track', 'PageView');
  };

  render() {
    return (
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=801998859871552&ev=PageView&noscript=1"
        />
      </noscript>
    );
  }
}

export default FaceBookReMarketing;
