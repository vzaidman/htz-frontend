import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} from 'graphql';

import GraphQLImageAspects from './image_aspects_type';

const ImageType = new GraphQLObjectType({
  name: 'Image',
  fields: () => ({
    viewMode: { type: GraphQLString, },
    accessibility: { type: GraphQLString, },
    title: { type: GraphQLString, },
    credit: { type: GraphQLString, },
    aspects: { type: GraphQLImageAspects, },
    isAnimated: { type: GraphQLBoolean, },
    contentId: { type: GraphQLID, },
    imgArray: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: 'Img',
          fields: () => ({
            imgName: { type: GraphQLString, },
            version: { type: GraphQLString, },
          }),
        })
      ),
    },
    imageType: { type: GraphQLString, },
    contentName: { type: GraphQLString, },
  }),
});

export default ImageType;
