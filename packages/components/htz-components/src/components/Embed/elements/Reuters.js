/* *************************************************************** *
 * This element accepts these inputTemplates:
  [
    com.polobase.ReutersEmbed,
  ]
 * *************************************************************** */

/* globals pym */

import React from 'react';
import PropTypes from 'prop-types';

import { VideoWrapper, } from '../sharedStyles/videoWrapper';
import { VideoElement, } from '../sharedStyles/videoElement';
import { appendScript, } from '../../../utils/scriptTools';

const Reuters = ({
  settings: { src, },
  embedType,
  onLoadCallback,
  contentId,
}) => {
  if (embedType === 'video') {
    return (
      <VideoWrapper>
        <VideoElement
          width="560"
          height="315"
          src={src.replace(/&amp;/g, '&')}
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
  if (embedType === 'live') {
    appendScript({
      src:
        'https://cdn1.agency.thomsonreuters.com/live-embed/initialize-iframe.js',
      id: 'reuters-live',
      isAsync: false,
    });
    return (
      <VideoWrapper>
        <div className="reuters-connect-livestream">
          <VideoElement
            className="reuters-connect-livestream-embed"
            src="https://cdn1.agency.thomsonreuters.com/live-embed/index.html"
            hls={src}
            autoPlay
            width="560"
            height="315"
            accountid="40811"
            userid="115909"
            frameBorder="0"
            allowFullScreen=""
          />
        </div>
      </VideoWrapper>
    );
  }
  if (embedType === 'interactive') {
    appendScript({
      src: 'http://graphics.thomsonreuters.com/pym.min.js',
      id: 'reuters-interactive',
      isAsync: false,
      onLoadFunction: () => {
        // eslint-disable-next-line no-unused-vars
        const pymParent = new pym.Parent(contentId, src, {});
      },
    });
    return <div id={contentId} />;
  }
  return null;
};

Reuters.propTypes = {
  /** Items id from polopoly */
  contentId: PropTypes.string.isRequired,
  /**
   * The type of this facebook element
   * ('interactive', 'video' or 'live').
   */
  embedType: PropTypes.string.isRequired,
  /**
   * The element's source code.
   */
  settings: PropTypes.shape({
    src: PropTypes.string.isRequired,
  }).isRequired,
  /**
   * A function to be called when the video finishes to load.
   */
  onLoadCallback: PropTypes.func,
};

Reuters.defaultProps = {
  onLoadCallback: null,
};

export default Reuters;
