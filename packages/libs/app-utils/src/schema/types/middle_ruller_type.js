import { GraphQLObjectType, GraphQLString, GraphQLID, } from 'graphql';

const MiddleRuler = new GraphQLObjectType({
  name: 'MiddleRuler',
  fields: () => ({
    inputTemplate: { type: GraphQLString, },
    contentName: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
    text: { type: GraphQLString, },
    actionUrl: { type: GraphQLString, },
  }),
});

export default MiddleRuler;
