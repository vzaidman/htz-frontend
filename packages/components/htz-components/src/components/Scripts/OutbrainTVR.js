/* eslint-disable */
import React, { Component } from 'react';
import { appendScript } from '../../utils/scriptTools';

class OutbrainTVR extends Component {
  componentDidMount() {
    appendScript({
      id: 'outbrain-tvr',
      sAsync: true,
      src: "//widgets.outbrain.com/outbrain.js",
      attributes: { type: 'text/javascript', },
    });
  }

  render() {
    return null;
  }
}

export default OutbrainTVR;
