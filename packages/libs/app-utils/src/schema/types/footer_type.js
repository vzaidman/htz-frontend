// eslint-disable-next-line import/no-extraneous-dependencies
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  // GraphQLNonNull,
  GraphQLBoolean,
} from 'graphql';

const Pair = new GraphQLObjectType({
  name: 'Pair',
  fields: () => ({
    text: { type: GraphQLString, },
    href: { type: GraphQLString, },
  }),
});

const Column = new GraphQLObjectType({
  name: 'Column',
  fields: () => ({
    title: { type: GraphQLString, },
    combineWithNextColumn: { type: GraphQLBoolean, },
    items: { type: new GraphQLList(Pair), },
  }),
});

const Footer = new GraphQLObjectType({
  name: 'Footer',
  fields: () => ({
    head: { type: new GraphQLList(Pair), },
    columns: { type: new GraphQLList(Column), },
    credit: { type: new GraphQLList(Pair), },
    toolbox: { type: new GraphQLList(Pair), },
  }),
});

export default Footer;
