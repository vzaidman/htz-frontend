// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLInt, GraphQLBoolean, } from 'graphql';

const IsPhoneConnectedWithEmail = new GraphQLObjectType({
  name: 'IsPhoneConnectedWithEmail',
  fields: () => ({
    isPhoneConnectedWithEmail: { type: GraphQLBoolean, },
    success: { type: GraphQLInt, },
  }),
});

export default IsPhoneConnectedWithEmail;
