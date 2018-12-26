import { GraphQLObjectType, GraphQLString, GraphQLID, } from 'graphql';
import GraphQLDate from './date_type';

const BreakingNewsType = new GraphQLObjectType({
  name: 'BreakingNews',
  fields: {
    contentId: { type: GraphQLID, },
    contentName: { type: GraphQLString, },
    inputTemplate: { type: GraphQLString, },
    title: { type: GraphQLString, },
    creationDateTime: { type: GraphQLDate, },
    url: { type: GraphQLString, },
  },
});

export default BreakingNewsType;
