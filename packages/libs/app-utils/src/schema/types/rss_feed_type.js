import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, } from 'graphql';

import RssFeedItemType from './rss_feed_item_type';

const RssFeedType = new GraphQLObjectType({
  name: 'RssFeed',
  fields: {
    contentId: { type: GraphQLID, },
    contentName: { type: GraphQLString, },
    inputTemplate: { type: GraphQLString, },
    title: { type: GraphQLString, },
    items: {
      type: new GraphQLList(RssFeedItemType),
    },
  },
});

export default RssFeedType;
