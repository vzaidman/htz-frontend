import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, } from 'graphql';
import BreakingNewsType from './breaking_news_type';

const BreakingNewsBoxType = new GraphQLObjectType({
  name: 'BreakingNewsBox',
  fields: {
    contentId: { type: GraphQLID, },
    contentName: { type: GraphQLString, },
    inputTemplate: { type: GraphQLString, },
    items: {
      type: new GraphQLList(BreakingNewsType),
    },
  },
});

export default BreakingNewsBoxType;
