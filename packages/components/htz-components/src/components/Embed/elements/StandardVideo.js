/* *************************************************************** *
 * This element accepts these inputTemplates:
  [
    com.polobase.BloombergEmbed,
    com.polobase.CNNEmbed,
    com.polobase.GuardianEmbed,
    com.polobase.MakoEmbed,
    com.polobase.KanEmbed,
    com.polobase.WashingtonPostEmbed,
  ]
 * *************************************************************** */

import React from 'react';
import PropTypes from 'prop-types';

import { VideoWrapper, } from '../sharedStyles/videoWrapper';
import { VideoElement, } from '../sharedStyles/videoElement';

StandardVideo.propTypes = {
  /**
   * The video's source code.
   */
  source: PropTypes.string.isRequired,
  /**
   * A function to be called when the video finishes to load.
   */
  onLoadCallback: PropTypes.func,
};

StandardVideo.defaultProps = {
  onLoadCallback: null,
};

function StandardVideo({ source, onLoadCallback, }) {
  return (
    <VideoWrapper>
      <VideoElement
        width="560"
        height="315"
        src={source.replace(/&amp;/g, '&')}
        frameBorder="0"
        allowFullScreen=""
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        onLoad={onLoadCallback}
      />
    </VideoWrapper>
  );
}

export default StandardVideo;
