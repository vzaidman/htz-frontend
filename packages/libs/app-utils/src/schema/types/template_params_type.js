// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLString, } from 'graphql';

const TemplateParams = new GraphQLObjectType({
  name: 'ConnectMailMobile',
  fields: () => ({
    userName: { type: GraphQLString, },
    userMobile: { type: GraphQLString, },
    url: { type: GraphQLString, },
    paramsString: { type: GraphQLString, },
  }),
});

export default TemplateParams;
