import React from 'react';
import PropTypes from 'prop-types';
import Embed from '../Embed/Embed';
import HtmlElement from '../Interactive/HtmlElement';

const propTypes = {
  /**
   * The video's source code (in case of embed, it will be an html snippet,
   * and in videoId, it will be youtube's video/playlist id).
   */
  videoContent: PropTypes.string.isRequired,
  /**
   * VideoType (`embed` or `videoId`) helps to determine which component should handle the video,
   * when `videoId` sends it to [Youtube component](./#youtube),
   * and `embed` to [HTMLElement component](./#htmlelement)
   */
  videoType: PropTypes.string.isRequired,
};

const getElement = (type, content) => {
  switch (type) {
    case 'videoId':
      return (
        <Embed
          inputTemplate="com.polobase.YouTubeEmbed"
          embedType={content.includes('?list=') ? 'playlist' : 'video'}
          content={content}
        />
      );
    case 'embed':
      return (
        <HtmlElement
          code={content}
          miscStyles={{
            textAlign: 'center',
          }}
        />
      );
    default:
      return null;
  }
};

/*
 * This Video component is for **legacy** purpose only.<br/>
 * It received the old video element (`input-template: com.tm.video`),
 * and according to its selected type it sends the video to [Youtube component](./#youtube)
 * or [HtmlElement component](./#htmlelement).
 */
function Video({ videoContent, videoType, }) {
  const VideoElement = getElement(videoType, videoContent);

  return <figure>{VideoElement && VideoElement}</figure>;
}

Video.propTypes = propTypes;

export default Video;
