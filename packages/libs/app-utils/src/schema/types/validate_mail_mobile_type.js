// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLString, } from 'graphql';

const ValidateConfirmation = new GraphQLObjectType({
  name: 'ValidateConfirmation',
  fields: () => ({
    message: { type: GraphQLString, },
    success: { type: GraphQLString, },
  }),
});

export default ValidateConfirmation;
