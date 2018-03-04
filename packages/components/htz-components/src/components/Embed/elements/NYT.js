/* *************************************************************** *
 * This element accepts these inputTemplates:
  [
    com.polobase.NYTEmbed,
  ]
 * *************************************************************** */

import React from 'react';
import PropTypes from 'prop-types';
import { VideoWrapper, } from '../sharedStyles/videoWrapper';
import { VideoElement, } from '../sharedStyles/videoElement';

NYT.propTypes = {
  /**
   * The video's source code.
   */
  content: PropTypes.string.isRequired,
  /**
   * A function to be called when the video finishes to load.
   */
  onLoadCallback: PropTypes.func,
};

NYT.defaultProps = {
  onLoadCallback: null,
};

function NYT(props) {
  return (
    <VideoWrapper aspectRatio={'16/9'} nyt>
      <VideoElement
        title="New York Times Video - Embed Player"
        width="auto"
        frameBorder="0"
        scrolling="no"
        allowFullScreen="true"
        marginHeight="0"
        marginWidth="0"
        id="nyt_video_player"
        src={props.content}
        onLoad={props.onLoadCallback}
      />
    </VideoWrapper>
  );
}

export default NYT;
