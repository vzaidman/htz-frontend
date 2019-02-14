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
  console.log('FIRST IMPRESSION MY ASS');
  })();

    `;

  render() {
    return null;
  }
}

export default FirstImpression;
