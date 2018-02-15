// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLInt, } from 'graphql';

const NewVoteResponseType = new GraphQLObjectType({
  name: 'NewVoteResponse',
  fields: () => ({
    status: { type: GraphQLInt, },
  }),
});

export default NewVoteResponseType;
