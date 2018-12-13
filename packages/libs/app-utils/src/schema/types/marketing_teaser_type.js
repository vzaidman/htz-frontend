// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLString, GraphQLID, } from 'graphql';

const MarketingTeaserType = new GraphQLObjectType({
  name: 'MarketingTeaser',
  fields: () => ({
    title: { type: GraphQLString, },
    subtitle: { type: GraphQLString, },
    href: { type: GraphQLString, },
    cta: { type: GraphQLString, },
    inputTemplate: { type: GraphQLString, },
    contentName: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
  }),
});

export default MarketingTeaserType;
