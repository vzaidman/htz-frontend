import { GraphQLObjectType, GraphQLBoolean, GraphQLString, GraphQLList, GraphQLID, } from 'graphql';

import GraphQLImageAspects from './image_aspects_type';

const ImageType = new GraphQLObjectType({
  name: 'Image',
  fields: () => ({
    viewMode: { type: GraphQLString, },
    position: { type: GraphQLString, },
    accessibility: { type: GraphQLString, },
    title: { type: GraphQLString, },
    credit: { type: GraphQLString, },
    // todo: remove aspects field when deprecated
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
            aspects: { type: GraphQLImageAspects, },
          }),
        })
      ),
    },
    imageType: { type: GraphQLString, },
    kind: { type: GraphQLString, },
    inputTemplate: { type: GraphQLString, },
    contentName: { type: GraphQLString, },
  }),
});

export default ImageType;
