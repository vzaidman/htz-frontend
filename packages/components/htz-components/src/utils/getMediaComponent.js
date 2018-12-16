import React from 'react';
import ArticleImage from '../components/ArticleBodyImage/ArticleBodyImage';
import Embed from '../components/Embed/Embed';
// import ImageGallery from '../ImageGallery/ImageGallery';
import Video from '../components/Video/Video';

export default (kind, ImageComponent = ArticleImage) => {
  switch (kind) {
    case 'image':
      return ImageComponent;
    case 'gallery':
      // return <ImageGallery {...elementObj} forceAspect="headline" />;
      return () => <p>ImageGallery</p>;
    case 'video':
      return Video;
    case 'embed':
      return Embed;
    default:
      return null;
  }
};
