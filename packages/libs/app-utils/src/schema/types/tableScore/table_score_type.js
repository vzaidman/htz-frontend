// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLUnionType, GraphQLID, } from 'graphql';

const FootballScore = new GraphQLObjectType({
  name: 'Football',
  fields: () => ({
    lost: { type: GraphQLString, },
    won: { type: GraphQLString, },
    playedGames: { type: GraphQLString, },
    name: { type: GraphQLString, },
    difference: { type: GraphQLString, },
    position: { type: GraphQLString, },
    draw: { type: GraphQLString, },
    points: { type: GraphQLString, },
    teamId: { type: GraphQLID, },
  }),
});
const NBAScore = new GraphQLObjectType({
  name: 'NBA',
  fields: () => ({
    name: { type: GraphQLString, },
    loss: { type: GraphQLString, },
    winPctV2: { type: GraphQLString, },
    win: { type: GraphQLString, },
    teamId: { type: GraphQLID, },
  }),
});


const TableScoreData = new GraphQLObjectType({
  name: 'TableScoreData',
  fields: () => ({
    type: { type: GraphQLString, },
    data: { type: new GraphQLList(new GraphQLUnionType({
      name: 'ScoreData',
      types: [
        FootballScore,
        NBAScore,
      ],
      resolveType: graphType => (
        graphType.winPctV2 ? NBAScore : FootballScore
      ),
    })), },
  }),

});

const TableScoreError = new GraphQLObjectType({
  name: 'TableScoreError',
  fields: () => ({
    type: { type: GraphQLString, },
    data: { type: GraphQLString, },
  }),

});

const TableScoreGraph = new GraphQLUnionType({
  name: 'TableScoreGraph',
  types: [
    TableScoreData,
    TableScoreError,
  ],
  resolveType: result => (result.type === 'ERROR' ? TableScoreError : TableScoreData),
});


export default TableScoreGraph;
