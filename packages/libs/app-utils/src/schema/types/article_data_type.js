// eslint-disable-next-line import/no-extraneous-dependencies
import {
  GraphQLObjectType,
  GraphQLUnionType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} from 'graphql';

import author from './author_type';
import articleBody from './article_body_type';
import date from './date_type';
import imageGallery from './image_gallery_type';
import htmlElement from './html_element_type';
import embed from './embed_type';
import image from './image_type';
import video from './video_type';

const types = new Map([
  [ 'embedElement', embed, ],
  [ 'com.tm.HtmlElement', htmlElement, ],
  [ 'com.tm.Image', image, ],
  [ 'com.tm.ImageGalleryElement', imageGallery, ],
  [ 'com.tm.Video', video, ],
]);

const ArticleData = new GraphQLObjectType({
  name: 'ArticleData',
  fields: () => ({
    header: {
      type: new GraphQLObjectType({
        name: 'ArticleHeader',
        fields: () => ({
          exclusive: { type: GraphQLString, },
          mobileExclusive: { type: GraphQLString, },
          mobileSubtitle: { type: GraphQLString, },
          mobileTitle: { type: GraphQLString, },
          modDate: { type: date, },
          pubDate: { type: date, },
          reportingFrom: { type: GraphQLString, },
          subtitle: { type: GraphQLString, },
          title: { type: GraphQLString, },
        }),
      }),
      resolve: parentValue => {
        const {
          authors,
          body,
          commentsElementId,
          contentId,
          contentName,
          inputTemplate,
          mainElement,
          ...header
        } = parentValue;
        return header;
      },
    },
    mainElement: {
      type: new GraphQLUnionType({
        name: 'HeadlineElement',
        types: [ embed, htmlElement, image, imageGallery, video, ],
        resolveType: value =>
          types.get(value.elementType || value.inputTemplate),
      }),
    },
    authors: { type: new GraphQLList(author), },
    body: { type: articleBody, },
    commentsElementId: { type: GraphQLID, },
    contentId: { type: GraphQLID, },
    contentName: { type: GraphQLString, },
    inputTemplate: { type: GraphQLString, },
  }),
});

export default ArticleData;
