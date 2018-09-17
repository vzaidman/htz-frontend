import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
} from 'graphql';

const scatterGraphType = new GraphQLObjectType({
  name: 'ScatterGraph',
  fields: () => ({
    xLabel: { type: GraphQLString, },
    yLabel: { type: GraphQLString, },
    dataSource: { type: GraphQLList(
      new GraphQLObjectType({
        name: 'ScatterGraphData',
        fields: () => ({
          x: { type: GraphQLFloat, },
          y: { type: GraphQLFloat, },
          id: { type: GraphQLString, },
          name: { type: GraphQLString, },
          symbol: { type: GraphQLString, },
        }),
      }),
    ), },
  }),
});

export default scatterGraphType;
