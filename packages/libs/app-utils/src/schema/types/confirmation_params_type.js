// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLString, } from 'graphql';

const ConfirmationParamsType = new GraphQLObjectType({
  name: 'ConfirmationParamsType',
  fields: () => ({
    email: { type: GraphQLString, },
    phone: { type: GraphQLString, },
  }),
});

export default ConfirmationParamsType;
