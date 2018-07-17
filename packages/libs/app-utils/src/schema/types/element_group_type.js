// eslint-disable-next-line import/no-extraneous-dependencies
import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';

const ElementGroup = new GraphQLObjectType({
  name: 'ElementGroup',
  fields: () => ({
    contentLists: { type: new GraphQLList(GraphQLJSON), },
    hideOnSite: { type: GraphQLBoolean, },
    inputTemplate: { type: GraphQLString, },
    contentName: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
  }),
});

export default ElementGroup;
