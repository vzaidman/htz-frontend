// eslint-disable-next-line import/no-extraneous-dependencies
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
} from 'graphql';

const Pair = new GraphQLObjectType({
  name: 'Pair',
  fields: () => ({
    key: { type: GraphQLNonNull(GraphQLString), },
    value: { type: GraphQLNonNull(GraphQLString), },
  }),
});

const Column = new GraphQLObjectType({
  name: 'Column',
  fields: () => ({
    title: { type: GraphQLNonNull(GraphQLString), },
    combineWithNextColumn: { type: GraphQLBoolean, },
    items: { type: GraphQLList(Pair), },
  }),
});

const Footer = new GraphQLObjectType({
  name: 'Footer',
  fields: () => ({
    head: { type: GraphQLList(Pair), },
    columns: { type: GraphQLList(Column), },
    credit: { type: GraphQLList(Pair), },
    toolbox: { type: GraphQLList(Pair), },
  }),
});

export default Footer;
