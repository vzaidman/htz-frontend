// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLInputObjectType, GraphQLString, GraphQLID, } from 'graphql';

const signUpNotificationVars = new GraphQLInputObjectType({
  name: 'signUpNotificationVars',
  fields: () => ({
    commentId: { type: GraphQLID, },
    hash: { type: GraphQLString, },
    userEmail: { type: GraphQLString, },
  }),
});

export default signUpNotificationVars;
