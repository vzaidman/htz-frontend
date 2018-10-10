/* eslint-disable */
import React, { Component } from 'react';
import { appendScript } from '../../utils/scriptTools';

class FirstImpression extends Component {
  componentDidMount() {
    appendScript({
      id: 'firstImpression',
      innerHtml: this.getInnerHtml(),
      attributes: { type: 'text/javascript', 'data-cfasync': 'false' },
    });
  }

  getInnerHtml = () => `
    window.apd_options = { 'websiteId': 5339, 'runFromFrame': false };
        (function() {
            var w = window.apd_options.runFromFrame ? window.top : window;
            if(window.apd_options.runFromFrame && w!=window.parent) w=window.parent;
            if (w.location.hash.indexOf('apdAdmin') != -1){if(typeof(Storage) !== 'undefined') {w.localStorage.apdAdmin = 1;}}
            var adminMode = ((typeof(Storage) == 'undefined') || (w.localStorage.apdAdmin == 1));
            w.apd_options=window.apd_options;
            var apd = w.document.createElement('script'); apd.type = 'text/javascript'; apd.async = true;
            apd.src = '//' + (adminMode ? 'cdn' : 'ecdn') + '.firstimpression.io/' + (adminMode ? 'fi.js?id=' + window.apd_options.websiteId : 'fi_client.js') ;
            var s = w.document.getElementsByTagName('head')[0]; s.appendChild(apd);
  })();

    `;

  render() {
    return null;
  }
}

export default FirstImpression;
