import { GraphQLObjectType, GraphQLString, GraphQLID, } from 'graphql';

import ImageType from './image_type';

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: {
    image: { type: ImageType, },
    contentId: { type: GraphQLID, },
    contentName: { type: GraphQLString, },
  },
});

export default AuthorType;
