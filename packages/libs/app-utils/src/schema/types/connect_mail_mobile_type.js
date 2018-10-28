// eslint-disable-next-line import/no-extraneous-dependencies
<<<<<<< HEAD
import { GraphQLObjectType, GraphQLString } from 'graphql';

const ConnectMailMobile = new GraphQLObjectType({
  name: 'ConnectMailMobile',
  fields: () => ({
    msg: { type: GraphQLString, },
    success: { type: GraphQLString, },
  }),
=======
import { GraphQLObjectType } from 'graphql';

const ConnectMailMobile = new GraphQLObjectType({
  name: 'ConnectMailMobile',
  fields: () => ({}),
>>>>>>> feat(login): fixes
});

export default ConnectMailMobile;
