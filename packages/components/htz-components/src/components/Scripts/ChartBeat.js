/* eslint-disable */
import React, { Component } from 'react';
import { appendScript } from '../../utils/scriptTools';

// var _sf_async_config = _sf_async_config || {};
// /** CONFIGURATION START **/
// _sf_async_config.sections = 'Change this to your Section name'; //CHANGE THIS
// _sf_async_config.authors = 'Change this to your Author name'; //CHANGE THIS
// /** CONFIGURATION END **/
// (function() {
//   function loadChartbeat() {
//     var e = document.createElement('script');
//     e.setAttribute('language', 'javascript');
//     e.setAttribute('type', 'text/javascript');
//     e.setAttribute('src', '//static.chartbeat.com/js/chartbeat.js');
//     document.body.appendChild(e);
//   }
//   var oldonload = window.onload;
//   window.onload =
//     typeof window.onload != 'function'
//       ? loadChartbeat
//       : function() {
//           oldonload();
//           loadChartbeat();
//         };
// })();

class ChartBeat extends Component {
  componentDidMount() {
    const _sf_async_config = (window._sf_async_config = window._sf_async_config || {});

    _sf_async_config.uid = 5952; // make this according to site once adding themarker/ haaretz.com
    _sf_async_config.domain = 'haaretz.co.il'; // make this according to site once adding themarker/ haaretz.com
    _sf_async_config.useCanonical = true;
    _sf_async_config.useCanonicalDomain = true;
    // currently not using these
    // _sf_async_config.sections = ''; //CHANGE THIS TO YOUR SECTION NAME(s)
    // _sf_async_config.authors = ''; //CHANGE THIS TO YOUR AUTHOR NAME(s)
    appendScript({
      id: 'charbeat',
      src: 'https://static.chartbeat.com/js/chartbeat.js',
      isAsync: true,
      attributes: { type: 'text/javascript' },
    });
  }

  render() {
    return null;
  }
}

export default ChartBeat;
