import { GraphQLObjectType, GraphQLString, GraphQLList, } from 'graphql';

const RssFeedItemType = new GraphQLObjectType({
  name: 'RssFeedItem',
  fields: {
    title: { type: GraphQLString, },
    creator: { type: GraphQLString, },
    author: { type: GraphQLString, },
    imageUrl: { type: new GraphQLList(GraphQLString), },
    link: { type: GraphQLString, },
    description: { type: GraphQLString, },
    publishedDate: { type: GraphQLString, },
  },
});

export default RssFeedItemType;
