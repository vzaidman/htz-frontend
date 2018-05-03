// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLString, } from 'graphql';

const ResetPassword = new GraphQLObjectType({
  name: 'ResetPassword',
  fields: () => ({
    message: { type: GraphQLString, },
    status: { type: GraphQLString, },
  }),
});

export default ResetPassword;
