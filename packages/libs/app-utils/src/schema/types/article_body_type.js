// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLList, GraphQLUnionType, } from 'graphql';
import getSchema from '../getSchema';

import content from './content_type';
import dfpBanner from './dfp_banner_type';
import elementGroup from './element_group_type';
import embed from './embed_type';
import htmlElement from './html_element_type';
import image from './image_type';
import imageGallery from './image_gallery_type';
import interactive from './interactive_type';
import link from './link_type';
import mobileQuickRegistrationType from './mobile_quick_registration_type';
import paragraph from './paragraph_type';
import relatedArticles from './related_articles_type';
import seriesOrBlockArticles from './series_or_block_articles_type';
import quote from './quote_type';
import tags from './tags_type';
import video from './video_type';

const ArticleBody = new GraphQLList(
  new GraphQLUnionType({
    name: 'ArticleBody',
    types: [
      content,
      dfpBanner,
      elementGroup,
      embed,
      htmlElement,
      image,
      imageGallery,
      interactive,
      link,
      mobileQuickRegistrationType,
      paragraph,
      relatedArticles,
      seriesOrBlockArticles,
      quote,
      tags,
      video,
    ],
    resolveType: value =>
      getSchema(
        value.tag ? 'paragraph' : value.elementType || value.inputTemplate
      ) || content,
  })
);

export default ArticleBody;
