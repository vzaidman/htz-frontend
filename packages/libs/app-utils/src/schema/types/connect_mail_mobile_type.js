// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLString } from 'graphql';

const ConnectMailMobile = new GraphQLObjectType({
  name: 'ConnectMailMobile',
  fields: () => ({
    message: { type: GraphQLString, },
    success: { type: GraphQLString, },
  }),
});

export default ConnectMailMobile;
