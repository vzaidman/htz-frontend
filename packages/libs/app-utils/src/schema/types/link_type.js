// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLString, GraphQLID, } from 'graphql';

const Link = new GraphQLObjectType({
  name: 'Link',
  fields: () => ({
    href: { type: GraphQLString, },
    toolTip: { type: GraphQLString, },
    linkText: { type: GraphQLString, },
    inputTemplate: { type: GraphQLString, },
    contentName: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
  }),
});

export default Link;
