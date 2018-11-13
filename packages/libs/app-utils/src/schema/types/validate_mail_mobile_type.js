// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLString, } from 'graphql';

const ValidateMailMobile = new GraphQLObjectType({
  name: 'ValidateMailMobile',
  fields: () => ({
    message: { type: GraphQLString, },
    success: { type: GraphQLString, },
  }),
});

export default ValidateMailMobile;
