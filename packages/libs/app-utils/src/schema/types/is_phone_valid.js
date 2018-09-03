// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLInt, GraphQLBoolean, } from 'graphql';

const IsPhoneValid = new GraphQLObjectType({
  name: 'IsPhoneValid',
  fields: () => ({
    isPhoneValid: { type: GraphQLBoolean, },
    success: { type: GraphQLInt, },
  }),
});

export default IsPhoneValid;
