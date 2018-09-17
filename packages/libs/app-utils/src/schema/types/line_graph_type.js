import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
} from 'graphql';

import { GraphQLTimestamp, } from './finance_table_type';

const scatterGraphType = new GraphQLObjectType({
  name: 'LineGraph',
  fields: () => ({
    xLabel: { type: GraphQLString, },
    yLabel: { type: GraphQLString, },
    startTime: { type: GraphQLTimestamp, },
    endTime: { type: GraphQLTimestamp, },
    dataSource: { type: GraphQLList(
      new GraphQLObjectType({
        name: 'LineGraphData',
        fields: () => ({
          time: { type: GraphQLTimestamp, },
          value: { type: GraphQLFloat, },
          change: { type: GraphQLFloat, },
          volume: { type: GraphQLFloat, },
          yieldSpread: { type: GraphQLFloat, },
          name: { type: GraphQLString, },
          symbol: { type: GraphQLString, },
        }),
      }),
    ), },
  }),
});

export default scatterGraphType;
