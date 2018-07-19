/* *************************************************************** *
 * This element accepts these inputTemplates:
  [
    com.polobase.ApesterEmbed,
  ]
 * This element does not emits an onLoad event
 * *************************************************************** */

import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { appendScript, } from '../../../utils/scriptTools';

// eslint-disable-next-line react/prop-types
const ApesterWrapper = ({ children, }) => (
  <FelaComponent
    style={{
      textAlign: 'center',
      margin: '0 auto',
    }}
  >
    {children}
  </FelaComponent>
);

export default class Apester extends React.Component {
  static propTypes = {
    /**
     * The settings values extracted from the Apester source code.
     */
    settings: PropTypes.shape({
      mediaId: PropTypes.string.isRequired,
      height: PropTypes.string.isRequired,
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
      src: '//static.apester.com/js/sdk/v2.0/apester-javascript-sdk.min.js',
      id: 'apester-js',
      onLoadFunction: this.props.onLoadCallback,
    });
  }

  render() {
    const { settings: { mediaId, height, }, } = this.props;

    return (
      <ApesterWrapper>
        <div
          className="apester-media"
          data-media-id={mediaId}
          height={height}
        />
      </ApesterWrapper>
    );
  }
}
