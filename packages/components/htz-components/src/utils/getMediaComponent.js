import React from 'react';
import ArticleImage from '../components/ArticleBodyImage/ArticleBodyImage';
import Embed from '../components/Embed/Embed';
// import ImageGallery from '../ImageGallery/ImageGallery';
import Video from '../components/Video/Video';

export default (elementType, ImageComponent = ArticleImage) => {
  switch (elementType) {
    case 'image':
      return ImageComponent;
    case 'gallery':
      // return <ImageGallery {...elementObj} forceAspect="headline" />;
      return () => <p>ImageGallery</p>;
    case 'video':
      return Video;
    case 'embedElement':
      return Embed;
    default:
      return null;
  }
};
