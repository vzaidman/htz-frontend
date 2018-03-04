import React from 'react';
import PropTypes from 'prop-types';
import Caption from '../Caption/Caption';
import Embed from '../Embed/Embed';

const propTypes = {
  /**
   * VideoType (`embed` or `videoId`) helps to determine which component should handle the video,
   * when `videoId` sends it to [Youtube component](./#youtube),
   * and `embed` to [HTMLElement component](./#html-element)
   */
  videoType: PropTypes.string.isRequired,
  /**
   * The video's source code (in case of embed, it will be an html snappet,
   * and in videoId, it will be youtube's video/playlist id.
   */
  videoContent: PropTypes.string.isRequired,
  /**
   * Video's title.
   */
  title: PropTypes.string,
  /**
   * Video's credit.
   */
  credit: PropTypes.string,
};

const defaultProps = {
  credit: null,
  title: null,
};

const getElement = (type, content) => {
  switch (type) {
    case 'videoId' :
      return (
        <Embed
          inputTemplate={'com.polobase.YouTubeEmbed'}
          embedType={content.includes('?list=') ? 'playlist' : 'video'}
          content={content}
        />
      );
    default :
      return null;
  }
};

function Video({ videoType, videoContent, credit, title, }) {
  const VideoElement = getElement(videoType, videoContent);

  return (
    <figure>
      {VideoElement && VideoElement}
      {
        (title || credit) &&
          <Caption
            caption={title}
            credit={credit}
          />
      }
    </figure>
  );
}

Video.propTypes = propTypes;
Video.defaultProps = defaultProps;

export default Video;
