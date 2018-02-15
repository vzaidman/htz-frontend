// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLID, GraphQLString, } from 'graphql';

const NewCommentResponseType = new GraphQLObjectType({
  name: 'NewCommentResponse',
  fields: () => ({
    newCommentId: { type: GraphQLID, },
    hash: { type: GraphQLString, },
  }),
});

export default NewCommentResponseType;
