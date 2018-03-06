/* *************************************************************** *
 * This element accepts these inputTemplates:
  [
    com.polobase.YouTubeEmbed,
  ]
 * *************************************************************** */

import React from 'react';
import PropTypes from 'prop-types';

import { VideoWrapper, } from '../sharedStyles/videoWrapper';
import { VideoElement, } from '../sharedStyles/videoElement';

const defaultSettings = {
  controls: '1',
  related: '1',
  loop: '0',
  logo: '1',
  mute: false,
  autoplay: false,
  startAt: 0,
  videoImage: null,
};

Youtube.propTypes = {
  /**
   * The type of this youtube element
   * ('video' or 'playlist').
   */
  embedType: PropTypes.string.isRequired,
  /**
   * The video's Id
   * (for example: for video - '3SzXM019pbs').
   */
  content: PropTypes.string.isRequired,
  settings: PropTypes.shape({
    /**
     * Should it display Youtube's controls ('0' || '1').
     */
    controls: PropTypes.string,
    /**
     * Should it display related videos after the playback ('0' || '1').
     */
    related: PropTypes.string,
    /**
     * Should it play in continuously loop ('0' || '1').
     */
    loop: PropTypes.string,
    /**
     * Should it display Youtube's logo ('0' || '1').
     */
    logo: PropTypes.string,
    /**
     * Should it automatically play in mute ('0' || '1').
     */
    mute: PropTypes.bool,
    /**
     * Should it play automatically ('0' || '1').
     */
    autoplay: PropTypes.bool,
    /**
     * Should it start at a specific time ('0' || '1').
     */
    startAt: PropTypes.number,
    /**
     * A link to the video image (for smartphone app).
     */
    videoImage: PropTypes.string,
  }),
  /**
   * A function to be called when the video finishes to load.
   */
  onLoadCallback: PropTypes.func,
};

Youtube.defaultProps = {
  settings: defaultSettings,
  onLoadCallback: null,
};

function Youtube(props) {
  const startAt = props.embedType === 'playlist' ? '&start=' : '?start=';
  const settings = props.settings || defaultSettings;

  return (
    <VideoWrapper aspectRatio="16/9">
      <VideoElement
        id={`yt_embed_${props.content}`}
        width="560"
        height="315"
        src={`//www.youtube.com/embed/${props.content}${startAt}${
          settings.startAt
        }
                &controls=${settings.controls}
                &loop=${settings.loop}
                &modestbranding=${settings.logo}
                &rel=${settings.related}
                &enablejsapi=1`}
        frameBorder="0"
        allowFullScreen=""
        onLoad={props.onLoadCallback}
      />
    </VideoWrapper>
  );
}

export default Youtube;
