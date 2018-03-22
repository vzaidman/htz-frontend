import { GraphQLObjectType, GraphQLString, } from 'graphql';

const ImageUrlType = new GraphQLObjectType({
  name: 'ImageUrl',
  fields: () => ({
    alt: { type: GraphQLString, },
    caption: { type: GraphQLString, },
    credit: { type: GraphQLString, },
    path: { type: GraphQLString, },
  }),
});

export default ImageUrlType;
