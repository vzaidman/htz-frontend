// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLList, GraphQLUnionType, } from 'graphql';

import embed from './embed_type';
import htmlElement from './html_element_type';
import image from './image_type';
import imageGallery from './image_gallery_type';
import interactive from './interactive_type';
import paragraph from './paragraph_type';
import relatedArticles from './related_articles_type';
import seriesOrBlockArticles from './series_or_block_articles_type';
import quote from './quote_type';
import tags from './tags_type';
import video from './video_type';

const types = new Map([
  [ 'embedElement', embed, ],
  [ 'com.tm.HtmlElement', htmlElement, ],
  [ 'com.tm.Image', image, ],
  [ 'com.tm.ImageGalleryElement', imageGallery, ],
  [ 'interactiveElement', interactive, ],
  [ 'paragraph', paragraph, ],
  [ 'relatedArticles', relatedArticles, ],
  [ 'relatedArticleSeries', seriesOrBlockArticles, ],
  [ 'linksBlock', seriesOrBlockArticles, ],
  [ 'com.htz.MagazineArticleQuote', quote, ],
  [ 'tagsElement', tags, ],
  [ 'com.tm.Video', video, ],
]);

const ArticleBody = new GraphQLList(
  new GraphQLUnionType({
    name: 'ArticleBody',
    types: [
      embed,
      htmlElement,
      image,
      imageGallery,
      interactive,
      paragraph,
      relatedArticles,
      seriesOrBlockArticles,
      quote,
      tags,
      video,
    ],
    resolveType: value =>
      types.get(
        value.tag ? 'paragraph' : value.elementType || value.inputTemplate
      ),
  })
);

export default ArticleBody;
