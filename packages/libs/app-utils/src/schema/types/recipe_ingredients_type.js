// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLList, GraphQLObjectType, GraphQLString, } from 'graphql';

const Instructions = new GraphQLList(
  new GraphQLObjectType({
    name: 'Ingredients',
    fields: () => ({
      header: { type: GraphQLString, },
      ingredients: {
        type: new GraphQLList(GraphQLString),
      },
    }),
  })
);

export default Instructions;
