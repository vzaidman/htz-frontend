// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLInt, GraphQLBoolean, } from 'graphql';

const IsEmailValid = new GraphQLObjectType({
  name: 'IsEmailValid',
  fields: () => ({
    isEmailValid: { type: GraphQLBoolean, },
    success: { type: GraphQLInt, },
  }),
});

export default IsEmailValid;
