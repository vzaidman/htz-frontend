/* eslint-disable */
import React, { Component } from 'react';
import { appendScript } from '../../utils/scriptTools';
import Head from 'next/head';

class ChartBeat extends Component {
  componentDidMount() {
    const _sf_async_config = (window._sf_async_config = window._sf_async_config || {});

    // This moved to createDocument head
    
    // _sf_async_config.uid = 5952; // make this according to site once adding themarker/ haaretz.com
    // _sf_async_config.domain = 'haaretz.co.il'; // make this according to site once adding themarker/ haaretz.com
    // _sf_async_config.useCanonical = true;
    // _sf_async_config.useCanonicalDomain = true;
    // _sf_async_config.flickerControl = true;


    // _sf_startpt = (new Date()).getTime();
    // currently not using these
    // _sf_async_config.sections = ''; //CHANGE THIS TO YOUR SECTION NAME(s)
    // _sf_async_config.authors = ''; //CHANGE THIS TO YOUR AUTHOR NAME(s)
    // appendScript({
    //   id: 'chartbeat',
    //   src: 'https://static.chartbeat.com/js/chartbeat.js',
    //   isAsync: true,
    //   attributes: { type: 'text/javascript' },
    // });
    // appendScript({
    //   id: 'chartbeat_mab',
    //   src: 'https://static.chartbeat.com/js/chartbeat_mab.js',
    //   isAsync: true,
    //   attributes: { type: 'text/javascript' },
    // });
    // appendScript({
    //   id: 'chartbeat-flicker-control',
    //   innerHtml: this.omitFlicker(),
    //   attributes: { type: 'text/javascript', 'data-cfasync': 'false'},
    // });
    appendScript({
      id: 'loadChartBeat',
      innerHtml: this.loadConfiguration(),
      attributes: { type: 'text/javascript', 'data-cfasync': 'false' },
    });
  }
  omitFlicker = () => `
        window.setTimeout(function() {
        var hider = document.getElementById('chartbeat-flicker-control-style');
        if (hider) {
            hider.parentNode.removeChild(hider);
        }
    }, 1000) ;
    `;


  loadConfiguration = () => `
  (function() {
      /** CONFIGURATION START **/
      var _sf_async_config = window._sf_async_config = (window._sf_async_config || {});

      _sf_async_config.sections = 'Change this to your Section name'; //CHANGE THIS TO YOUR SECTION NAME(s)
      _sf_async_config.authors = 'Change this to your Section name'; //CHANGE THIS TO YOUR AUTHOR NAME(s)
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
 ;
    `;


  render() {
    return null;
  }
}

export default ChartBeat;
