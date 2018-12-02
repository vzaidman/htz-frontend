// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLString, GraphQLBoolean, } from 'graphql';

const ValidateConfirmation = new GraphQLObjectType({
  name: 'ValidateConfirmation',
  fields: () => ({
    msg: { type: GraphQLString, },
    success: { type: GraphQLBoolean, },
  }),
});

export default ValidateConfirmation;
