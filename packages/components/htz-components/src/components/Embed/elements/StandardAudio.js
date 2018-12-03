/* *************************************************************** *
 * This element accepts these inputTemplates:
  [
    com.polobase.SoundCloudEmbed,
    com.polobase.FM103Embed,
  ]
 * *************************************************************** */

import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';

StandardAudio.propTypes = {
  /**
   * The type of audio you want to embed
   * (for example: '103FM').
   */
  embedType: PropTypes.string.isRequired,
  /**
   * The audio's source code.
   */
  source: PropTypes.string.isRequired,
  /**
   * A function to be called when the audio element finishes to load.
   */
  onLoadCallback: PropTypes.func,
};

StandardAudio.defaultProps = {
  onLoadCallback: null,
};

// eslint-disable-next-line react/prop-types
const AudioWrapper = ({ height, children, }) => (
  <FelaComponent
    style={{
      margin: '0',
      height: `${height}px` || 'auto',
      overflow: 'hidden',
      position: 'relative',
    }}
  >
    {children}
  </FelaComponent>
);

function StandardAudio({ embedType, source, onLoadCallback, }) {
  const src =
    embedType === '103FM'
      ? `https://103fm.maariv.co.il/mediaEmbed.aspx?${source}`
      : `https://w.soundcloud.com/player/?url=${source}`;

  const height =
    embedType === '103FM' ? 300 : embedType === 'playlist' ? 450 : 180;

  return (
    <AudioWrapper height={height}>
      <iframe
        title="audio embed"
        width="100%"
        height="100%"
        scrolling="no"
        frameBorder="no"
        src={src}
        seamless
        onLoad={onLoadCallback}
      />
    </AudioWrapper>
  );
}

export default StandardAudio;
