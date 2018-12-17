import { GraphQLObjectType, GraphQLBoolean, GraphQLString, GraphQLList, GraphQLID, } from 'graphql';

const TabViewElements = new GraphQLObjectType({
  name: 'TabViewElements',
  fields: () => ({
    title: { type: GraphQLString, },
    type: { type: GraphQLString, },
    viewMode: { type: GraphQLString, },
    elements: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: 'TabViewElement',
          fields: () => ({
            view: { type: GraphQLString, },
            hasPagination: { type: GraphQLBoolean, },
            inputTemplate: { type: GraphQLString, },
            contentId: { type: GraphQLID, },
            contentName: { type: GraphQLString, },
          }),
        })
      ),
    },
    inputTemplate: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
    contentName: { type: GraphQLString, },
  }),
});

export default TabViewElements;
