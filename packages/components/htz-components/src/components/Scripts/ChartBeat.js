/* eslint-disable */
import React, { Component } from 'react';
import { appendScript } from '../../utils/scriptTools';

class ChartBeat extends Component {
  componentDidMount() {
    appendScript({
      id: 'charbeat',
      innerHtml: this.getInnerHtml(),
      attributes: { type: 'text/javascript' },
    });
  }

  getInnerHtml = () => `
    /** CONFIGURATION START **/
    (function() {
      /** CONFIGURATION START **/
      var _sf_async_config = (window._sf_async_config = window._sf_async_config || {});
  
      _sf_async_config.uid = 5952; // make this according to site once adding themarker/ haaretz.com
      _sf_async_config.domain = 'haaretz.co.il'; // make this according to site once adding themarker/ haaretz.com
      _sf_async_config.useCanonical = true;
      _sf_async_config.useCanonicalDomain = true;
      // currently not using these
      // _sf_async_config.sections = ''; //CHANGE THIS TO YOUR SECTION NAME(s)
      // _sf_async_config.authors = ''; //CHANGE THIS TO YOUR AUTHOR NAME(s)
      /** CONFIGURATION END **/
      function loadChartbeat() {
        var e = document.createElement('script');
        var n = document.getElementsByTagName('script')[0];
        e.type = 'text/javascript';
        e.async = true;
        e.src = '//static.chartbeat.com/js/chartbeat.js';
        n.parentNode.insertBefore(e, n);
      }
      loadChartbeat();
   })();
    `;

  render() {
    return null;
  }
}

export default ChartBeat;
