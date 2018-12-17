// eslint-disable-next-line import/no-extraneous-dependencies
import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLID,
} from 'graphql';


const ListInit = new GraphQLObjectType({
  name: 'ListInit',
  fields: () => ({
    contentName: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
    inputTemplate: { type: GraphQLString, },
    hasPagination: { type: GraphQLBoolean, },
    view: { type: GraphQLString, },
  }),
});

export default ListInit;
