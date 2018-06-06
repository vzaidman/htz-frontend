import { GraphQLObjectType, GraphQLList, } from 'graphql';
import GraphQLJSON from 'graphql-type-json';

import article from './article_type';

const StandardArticleSlotsType = new GraphQLObjectType({
  name: 'StandardArticleSlots',
  fields: () => ({
    preHeader: { type: new GraphQLList(GraphQLJSON), },
    header: { type: new GraphQLList(GraphQLJSON), },
    postHeader: { type: new GraphQLList(GraphQLJSON), },
    aside: { type: new GraphQLList(GraphQLJSON), },
    article: { type: article, },
    postMain: { type: new GraphQLList(GraphQLJSON), },
    footer: { type: new GraphQLList(GraphQLJSON), },
  }),
});

export default StandardArticleSlotsType;
