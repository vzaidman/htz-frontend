/* *************************************************************** *
 * This element accepts these inputTemplates:
  [
    com.polobase.TlineEmbed,
  ]
 * This element does not emits an onLoad event
 * *************************************************************** */

import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { appendScript, } from '../../../utils/scriptTools';

// eslint-disable-next-line react/prop-types
const TlineWrapper = ({ className, children, ...props }) => (
  <FelaComponent
    style={{
      textAlign: 'center',
      margin: '0 auto',
    }}
    render={({ className: classes, }) => (
      <div className={`${classes} ${className}`} {...props}>
        {children}
      </div>
    )}
  />
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
    const { settings, } = this.props;
    const { src, } = settings;
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
