import { GraphQLObjectType, GraphQLList, } from 'graphql';
import GraphQLJSON from 'graphql-type-json';

const StandardArticleSlotsType = new GraphQLObjectType({
  name: 'StandardArticleSlots',
  fields: () => ({
    preHeader: { type: new GraphQLList(GraphQLJSON), },
    header: { type: new GraphQLList(GraphQLJSON), },
    postHeader: { type: new GraphQLList(GraphQLJSON), },
    aside: { type: new GraphQLList(GraphQLJSON), },
    article: { type: new GraphQLList(GraphQLJSON), },
    postMain: { type: new GraphQLList(GraphQLJSON), },
    footer: { type: new GraphQLList(GraphQLJSON), },
  }),
});

export default StandardArticleSlotsType;
