/* *************************************************************** *
 * This element accepts these inputTemplates:
[
com.polobase.ReutersEmbed,
com.polobase.BloombergEmbed,
com.polobase.CNNEmbed,
com.polobase.GuardianEmbed,
com.polobase.MakoEmbed,
]
 * *************************************************************** */

import React from 'react';
import PropTypes from 'prop-types';
import Caption from '../../Caption/Caption';

import { VideoWrapper, } from '../sharedStyles/videoWrapper';
import { VideoElement, } from '../sharedStyles/videoElement';

StandardVideo.propTypes = {
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

StandardVideo.defaultProps = {
  caption: '',
  credit: '',
  onLoadCallback: null,
};

function StandardVideo(props) {
  return (
    <div>
      <VideoWrapper>
        <VideoElement
          width="560"
          height="315"
          src={props.content}
          frameBorder="0"
          allowFullScreen=""
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
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

export default StandardVideo;
