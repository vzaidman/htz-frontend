/* *************************************************************** *
 * This element accepts these inputTemplates:
[
com.polobase.VimeoEmbed,
]
 * *************************************************************** */

import React from 'react';
import PropTypes from 'prop-types';
import Caption from '../../Caption/Caption';

import { VideoWrapper, } from '../sharedStyles/videoWrapper';
import { VideoElement, } from '../sharedStyles/videoElement';

Vimeo.propTypes = {
  /**
   * The video's Id
   * (for example: '105847954').
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

Vimeo.defaultProps = {
  caption: '',
  credit: '',
  onLoadCallback: null,
};

function Vimeo(props) {
  return (
    <div>
      <VideoWrapper>
        <VideoElement
          width="640"
          height="360"
          src={`https://player.vimeo.com/video/${props.content}`}
          frameBorder="0"
          allowFullScreen=""
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

export default Vimeo;
