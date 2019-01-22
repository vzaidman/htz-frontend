/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { appendScript } from '../../utils/scriptTools';

class ChartBeat extends Component {
  static propTypes = {
    shouldRender: PropTypes.bool.isRequired,
  };
  componentDidMount() {
    if (this.props.shouldRender) {
      appendScript({
        id: 'loadChartBeat',
        innerHtml: this.loadConfiguration(),
        attributes: { type: 'text/javascript', 'data-cfasync': 'false' },
      });
    }
    return null;
  }

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
