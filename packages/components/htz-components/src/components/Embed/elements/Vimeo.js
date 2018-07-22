/* *************************************************************** *
 * This element accepts these inputTemplates:
  [
    com.polobase.VimeoEmbed,
  ]
 * *************************************************************** */

import React from 'react';
import PropTypes from 'prop-types';

import { VideoWrapper, } from '../sharedStyles/videoWrapper';
import { VideoElement, } from '../sharedStyles/videoElement';

Vimeo.propTypes = {
  /**
   * The video's Id
   * (for example: '105847954').
   */
  source: PropTypes.string.isRequired,
  /**
   * A function to be called when the video finishes to load.
   */
  onLoadCallback: PropTypes.func,
};

Vimeo.defaultProps = {
  onLoadCallback: null,
};

function Vimeo({ source, onLoadCallback, }) {
  return (
    <VideoWrapper>
      <VideoElement
        width="640"
        height="360"
        src={`https://player.vimeo.com/video/${source}`}
        frameBorder="0"
        allowFullScreen=""
        onLoad={onLoadCallback}
      />
    </VideoWrapper>
  );
}

export default Vimeo;
