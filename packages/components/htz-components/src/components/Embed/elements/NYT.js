/* *************************************************************** *
 * This element accepts these inputTemplates:
[
com.polobase.NYTEmbed,
]
 * *************************************************************** */

import React from 'react';
import PropTypes from 'prop-types';
import Caption from '../../Caption/Caption';
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
  /**
   * Caption for this video (Passes down to the [***Caption***](./#caption) component).
   */
  caption: PropTypes.string,
  /**
   * Credit (Passes, along with the Caption, down to the [***Caption***](./#caption) component).
   */
  credit: PropTypes.string,
};

NYT.defaultProps = {
  caption: '',
  credit: '',
  onLoadCallback: null,
};


function NYT(props) {
  return (
    <div>
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
      <Caption
        caption={props.caption}
        credit={props.credit}
      />
    </div>
  );
}

export default NYT;
