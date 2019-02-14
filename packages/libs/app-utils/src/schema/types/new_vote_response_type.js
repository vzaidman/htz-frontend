// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLString, } from 'graphql';

const NewVoteResponseType = new GraphQLObjectType({
  name: 'NewVoteResponse',
  fields: () => ({
    status: { type: GraphQLString, },
  }),
});

export default NewVoteResponseType;
