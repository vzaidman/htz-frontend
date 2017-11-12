// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLID, } from 'graphql';

const NewCommentResponseType = new GraphQLObjectType({
  name: 'NewCommentResponse',
  fields: () => ({
    newCommentId: { type: GraphQLID, },
  }),
});

export default NewCommentResponseType;
