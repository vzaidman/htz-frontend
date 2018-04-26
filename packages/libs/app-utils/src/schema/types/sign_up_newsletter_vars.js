// eslint-disable-next-line import/no-extraneous-dependencies
import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
} from 'graphql';

const signUpNewsletterVars = new GraphQLInputObjectType({
  name: 'signUpNewsletterVars',
  fields: () => ({
    userEmail: { type: GraphQLString, },
    segmentId: { type: GraphQLID, },
    checkBox: { type: GraphQLBoolean, },
  }),
});

export default signUpNewsletterVars;
