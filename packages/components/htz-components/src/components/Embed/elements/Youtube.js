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
  source: PropTypes.string.isRequired,
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

function Youtube({ embedType, settings, source, onLoadCallback, }) {
  const start = embedType === 'playlist' ? '&start=' : '?start=';

  /* eslint-disable no-unused-vars */
  const { controls, related, loop, logo, mute, autoplay, startAt, videoImage, } = settings || defaultSettings;
  /* eslint-enable no-unused-vars */

  const playlist = embedType !== 'playlist' && loop === '1' ? `&playlist=${source}` : ''; // must add playlist to enable looping

  return (
    <VideoWrapper aspectRatio="16/9">
      <VideoElement
        id={`yt_embed_${source}`}
        width="560"
        height="315"
        src={`//www.youtube.com/embed/${source}${start}${startAt}&controls=${controls}&loop=${loop}&modestbranding=${logo}&rel=${related}&autoplay=${autoplay}&enablejsapi=1&mute=${mute}${playlist}`}
        frameBorder="0"
        allowFullScreen=""
        onLoad={onLoadCallback}
      />
    </VideoWrapper>
  );
}

export default Youtube;
