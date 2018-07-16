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

const headlineTypes = [
  'embedElement',
  'com.tm.Image',
  'com.tm.Video',
  'com.tm.ImageGalleryElement',
];

const ArticleData = new GraphQLObjectType({
  name: 'ArticleData',
  fields: () => ({
    authors: { type: new GraphQLList(author), },
    body: { type: articleBody, },
    commentsElementId: { type: GraphQLID, },
    contentId: { type: GraphQLID, },
    contentName: { type: GraphQLString, },
    exclusive: { type: GraphQLString, },
    inputTemplate: { type: GraphQLString, },
    mobileExclusive: { type: GraphQLString, },
    mobileSubtitle: { type: GraphQLString, },
    mobileTitle: { type: GraphQLString, },
    modDate: { type: date, },
    pubDate: { type: date, },
    reportingFrom: { type: GraphQLString, },
    subtitle: { type: GraphQLString, },
    title: { type: GraphQLString, },
    headlineElement: {
      type: new GraphQLUnionType({
        name: 'HeadlineElement',
        types: [
          embed,
          htmlElement,
          image,
          imageGallery,
          video,
        ],
        resolveType: value =>
          types.get(value.elementType || value.inputTemplate),
      }),
      resolve: parentValue => {
        const { body, } = parentValue;
        const firstElement = body[0];
        if (headlineTypes.includes(firstElement.elementType || firstElement.inputTemplate)) {
          return firstElement;
        }
        return null;
      },
    },
  }),
});

export default ArticleData;
