import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} from 'graphql';
import List from './list_type';

const TabViewElements = new GraphQLObjectType({
  name: 'TabViewElements',
  fields: () => ({
    title: { type: GraphQLString, },
    type: { type: GraphQLString, },
    viewMode: { type: GraphQLString, },
    elements: {
      type: new GraphQLList(List),
    },
    inputTemplate: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
    contentName: { type: GraphQLString, },
  }),
});

export default TabViewElements;
