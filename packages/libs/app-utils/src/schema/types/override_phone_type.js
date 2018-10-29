// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLString, } from 'graphql';

const OverridePhone = new GraphQLObjectType({
  name: 'OverridePhone',
  fields: () => ({
    msg: { type: GraphQLString, },
    success: { type: GraphQLString, },
  }),
});

export default OverridePhone;
