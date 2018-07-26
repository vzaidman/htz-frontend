// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLList, GraphQLInt, } from 'graphql';
import GraphQLJSON from 'graphql-type-json';

const SolrResponse = new GraphQLObjectType({
  name: 'SolrResponse',
  fields: () => ({
    response: {
      type: new GraphQLObjectType({
        name: 'Response',
        fields: () => ({
          numFound: { type: GraphQLInt, },
          start: { type: GraphQLInt, },
          docs: { type: new GraphQLList(GraphQLJSON), },
        }),
      }),
    },
  }),
});

export default SolrResponse;
