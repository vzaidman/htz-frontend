import React from 'react';
import ArticleImage from '../ArticleBodyImage/ArticleBodyImage';
import Embed from '../Embed/Embed';
// import ImageGallery from '../ImageGallery/ImageGallery';
import Video from '../Video/Video';

export default (uniqueId, ImageComponent = ArticleImage) => {
  switch (uniqueId) {
    case 'com.tm.Image':
    case 'com.tm.BlogImage':
      return ImageComponent;
    case 'com.tm.ImageGalleryElement':
      // return <ImageGallery {...elementObj} forceAspect="headline" />;
      return () => <p>ImageGallery</p>;
    case 'com.tm.Video':
      return Video;
    case 'embedElement':
      return Embed;
    default:
      return null;
  }
};
