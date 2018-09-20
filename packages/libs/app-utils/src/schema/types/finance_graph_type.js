import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLList, GraphQLUnionType,
} from 'graphql';

import { GraphQLTimestamp, } from './finance_table_type';

const lineGraph = new GraphQLObjectType({
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
});

const scatterGraph = new GraphQLObjectType({
  name: 'ScatterGraphData',
  fields: () => ({
    x: { type: GraphQLFloat, },
    y: { type: GraphQLFloat, },
    id: { type: GraphQLString, },
    name: { type: GraphQLString, },
    symbol: { type: GraphQLString, },
  }),
});

const financeType = new GraphQLObjectType({
  name: 'FinanceGraph',
  fields: () => ({
    xLabel: { type: GraphQLString, },
    yLabel: { type: GraphQLString, },
    startTime: { type: GraphQLTimestamp, },
    endTime: { type: GraphQLTimestamp, },
    dataSource: { type: GraphQLList(
      new GraphQLUnionType({
        name: 'DataSource',
        types: [
          lineGraph,
          scatterGraph,
        ],
        resolveType: value => (
          value.time ? lineGraph : scatterGraph
        ),
      })
    ), },
  }),
});

export default financeType;
