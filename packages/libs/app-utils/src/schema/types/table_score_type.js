import { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLID } from 'graphql';


const TableScore = new GraphQLObjectType({
  name: 'TableScore',
  fields: () => ({
    inputTemplate: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
    tableType: { type: GraphQLString, },
    coastType: { type: GraphQLString, },
    isOpen: { type: GraphQLBoolean, },
    league: { type: GraphQLString, },
    number: { type: GraphQLString, },

  }),
});

export default TableScore;
