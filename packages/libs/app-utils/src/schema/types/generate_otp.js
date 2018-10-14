// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLString, GraphQLBoolean, } from 'graphql';

const GenerateOtp = new GraphQLObjectType({
  name: 'GenerateOtp',
  fields: () => ({
    msg: { type: GraphQLString, },
    hash: { type: GraphQLString, },
    success: { type: GraphQLBoolean, },
  }),
});

export default GenerateOtp;
