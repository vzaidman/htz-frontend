import ArticleImage from '../components/ArticleBodyImage/ArticleBodyImage';
import Embed from '../components/Embed/Embed';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import Video from '../components/Video/Video';

export default (kind, ImageComponent = ArticleImage) => {
  switch (kind) {
    case 'image':
      return ImageComponent;
    case 'gallery':
      return ImageGallery;
    case 'video':
      return Video;
    case 'embed':
      return Embed;
    default:
      return null;
  }
};
