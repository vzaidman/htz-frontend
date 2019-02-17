import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
} from 'graphql';

import RssFeedItemType from './rss_feed_item_type';

const RssFeedType = new GraphQLObjectType({
  name: 'RssFeed',
  fields: {
    contentId: { type: GraphQLID, },
    contentName: { type: GraphQLString, },
    inputTemplate: { type: GraphQLString, },
    title: { type: GraphQLString, },
    loadPriority: { type: GraphQLString, },
    lazyloadDistance: { type: GraphQLInt, },
    items: {
      type: new GraphQLList(RssFeedItemType),
    },
  },
});

export default RssFeedType;
