/* eslint-disable */
import React, { Component } from 'react';
import { appendScript } from '../../utils/scriptTools';

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
