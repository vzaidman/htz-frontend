/* *************************************************************** *
 * This element accepts these inputTemplates:
  [
    com.polobase.TlineEmbed,
  ]
 * This element does not emits an onLoad event
 * *************************************************************** */

import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import { appendScript, } from '../../../utils/scriptTools';

const tlineWrapper = () => ({
  textAlign: 'center',
  margin: '0 auto',
});

const TlineWrapper = createComponent(tlineWrapper, 'figure', props =>
  Object.keys(props)
);

export default class Tline extends React.Component {
  static propTypes = {
    /**
     * The settings values extracted from the Tline source code.
     */
    settings: PropTypes.shape({
      src: PropTypes.string.isRequired,
      'data-alias': PropTypes.string.isRequired,
      'data-version': PropTypes.string.isRequired,
    }).isRequired,
    /**
     * A function to be called when the audio element finishes to load.
     */
    onLoadCallback: PropTypes.func,
  };

  static defaultProps = {
    onLoadCallback: null,
  };

  componentDidMount() {
    appendScript({
      src: 'https://tline.io/assets/js/release/loader.js',
      id: 'tline-js',
      isAsync: true,
      onLoadFunction: this.props.onLoadCallback,
    });
  }

  render() {
    const settings = this.props.settings;
    const src = settings.src;
    const alias = settings['data-alias'];
    const version = settings['data-version'];

    return (
      <TlineWrapper
        data-alias={alias}
        data-version={version}
        className="tline-iframe op-interactive"
      >
        <iframe
          title="video embed"
          className="tline-iframe-nojs"
          src={src}
          height="700"
          width="100%"
          scrolling="yes"
          frameBorder="0"
        />
      </TlineWrapper>
    );
  }
}
