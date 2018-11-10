import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLList, GraphQLUnionType,
} from 'graphql';

import { GraphQLTimestamp, } from './finance_asset_type';

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
    name: { type: GraphQLString, },
    symbol: { type: GraphQLString, },
  }),
});

const areaGraph = new GraphQLObjectType({
  name: 'AreaGraphData',
  fields: () => ({
    time: { type: GraphQLTimestamp, },
    value: { type: GraphQLFloat, },
    peRatio: { type: GraphQLFloat, },
  }),
});

const financeGraph = new GraphQLObjectType({
  name: 'FinanceGraph',
  fields: () => ({
    startTime: { type: GraphQLTimestamp, },
    endTime: { type: GraphQLTimestamp, },
    dataSource: { type: GraphQLList(
      new GraphQLUnionType({
        name: 'DataSource',
        types: [
          lineGraph,
          scatterGraph,
          areaGraph,
        ],
        resolveType: value => (
          value.time
            ? value.peRatio
              ? areaGraph
              : lineGraph
            : scatterGraph
        ),
      })
    ), },
  }),
});

export default financeGraph;
