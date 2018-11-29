import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLBoolean,
} from 'graphql';

import imageType from './image_type';

const ImageGalleryType = new GraphQLObjectType({
  name: 'ImageGallery',
  fields: () => ({
    images: { type: new GraphQLList(imageType), },
    accessibility: { type: GraphQLString, },
    name: { type: GraphQLString, },
    showTitle: { type: GraphQLBoolean, },
    contentId: { type: GraphQLID, },
    contentName: { type: GraphQLString, },
    inputTemplate: { type: GraphQLString, },
  }),
});

export default ImageGalleryType;
