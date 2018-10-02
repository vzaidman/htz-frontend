import {
  GraphQLFloat,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const shareHolder = new GraphQLObjectType({
  name: 'ShareHolder',
  fields: () => ({
    shareHolderName: { type: GraphQLString, },
    equityHolderPercentage: { type: GraphQLFloat, },
    holdingMarketCap: { type: GraphQLFloat, },
  }),
});

export default shareHolder;
