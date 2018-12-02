// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLString, } from 'graphql';

const SimpleResponse = new GraphQLObjectType({
  name: 'SimpleResponse',
  fields: () => ({
    message: { type: GraphQLString, },
    success: { type: GraphQLString, },
  }),
});

export default SimpleResponse;
