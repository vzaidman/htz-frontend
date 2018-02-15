// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLInputObjectType, GraphQLString, GraphQLID, } from 'graphql';

const voteVars = new GraphQLInputObjectType({
  name: 'voteVars',
  fields: () => ({
    articleId: { type: GraphQLString, },
    commentId: { type: GraphQLID, },
    group: { type: GraphQLString, },
  }),
});

export default voteVars;
