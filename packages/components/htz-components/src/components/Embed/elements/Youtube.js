/* *************************************************************** *
 * This element accepts these inputTemplates:
  [
    com.polobase.YouTubeEmbed,
  ]
 * *************************************************************** */

import React from 'react';
import PropTypes from 'prop-types';

import { FelaComponent, } from 'react-fela';
import { VideoWrapper, } from '../sharedStyles/videoWrapper';
import { VideoElement, } from '../sharedStyles/videoElement';

const defaultSettings = {
  controls: '1',
  related: '1',
  loop: '0',
  logo: '1',
  mute: false,
  autoplay: false,
  isVertical: false,
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
     * Should it display in a vertical aspect ratio.
     */
    isVertical: PropTypes.bool,
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

const verticalWrapperStyle = theme => ({
  extend: [
    theme.mq(
      { until: 's', },
      { maxWidth: '57rem', }
    ),
    theme.mq(
      { from: 's', until: 'xl', },
      { maxWidth: '55rem', }
    ),
    theme.mq(
      { from: 'xl', },
      { maxWidth: '47rem', }
    ),
  ],
});

function Youtube({ embedType, settings, source, onLoadCallback, }) {
  const start = embedType === 'playlist' ? '&start=' : '?start=';

  /* eslint-disable no-unused-vars */
  const { controls, related, loop, logo, mute, autoplay, isVertical, startAt, videoImage, } = settings || defaultSettings;
  /* eslint-enable no-unused-vars */

  const playlist = embedType !== 'playlist' && loop === '1' ? `&playlist=${source}` : ''; // must add playlist to enable looping

  return (
    <FelaComponent
      {...(isVertical ? { style: verticalWrapperStyle, } : {})}
    >
      <VideoWrapper aspectRatio={isVertical ? '9/16' : '16/9'}>
        <VideoElement
          id={`yt_embed_${source}`}
          width="100%"
          height="100%"
          src={`//www.youtube.com/embed/${source}${start}${startAt}&controls=${controls}&loop=${loop}&modestbranding=${logo}&rel=${related}&autoplay=${autoplay}&enablejsapi=1&mute=${mute}${playlist}`}
          frameBorder="0"
          allowFullScreen
          onLoad={onLoadCallback}
        />
      </VideoWrapper>
    </FelaComponent>
  );
}

export default Youtube;
