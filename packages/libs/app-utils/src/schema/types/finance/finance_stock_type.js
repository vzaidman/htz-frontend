import {
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLInt,
} from 'graphql';

import { GraphQLTimestamp, } from './finance_table_type';

const StockType = new GraphQLEnumType({
  name: 'StockType',
  values: {
    standard: { value: 'מניה רגילה', },
  },
});

const stock = new GraphQLObjectType({
  name: 'Stock',
  fields: () => ({
    id: { type: GraphQLString, },
    name: { type: GraphQLString, },
    value: { type: GraphQLFloat, },
    changePercentage: { type: GraphQLFloat, },
    changeInCurr: { type: GraphQLFloat, },
    stockType: { type: StockType, },
    stockNumber: { type: GraphQLInt, },
    lastTradeTime: { type: GraphQLTimestamp, },
    relatedStocks: { type: new GraphQLList(GraphQLString), },
    volume: { type: GraphQLFloat, },
    dailyAvgVolume: { type: GraphQLFloat, },
    dailyYield: { type: GraphQLFloat, },
    weeklyYield: { type: GraphQLFloat, },
    monthlyYield: { type: GraphQLFloat, },
    quarterlyYield: { type: GraphQLFloat, },
    yearlyYield: { type: GraphQLFloat, },
    threeYearsYield: { type: GraphQLFloat, },
    fiveYearsYield: { type: GraphQLFloat, },
    maxYield: { type: GraphQLFloat, },
    shareHolders: { type: new GraphQLList(
      new GraphQLObjectType({
        name: 'ShareHolder',
        fields: () => ({
          shareHolderName: { type: GraphQLString, },
          equityHolderPercentage: { type: GraphQLFloat, },
          holdingMarketCap: { type: GraphQLFloat, },
        }),
      })
    ), },
  }),
});

export default stock;
