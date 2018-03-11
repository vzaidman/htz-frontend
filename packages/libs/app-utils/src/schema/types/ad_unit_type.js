// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean, } from 'graphql';

import GraphQLJSON from 'graphql-type-json';

// import ContentInterface from './content_interface';

const AdUnitConfigType = new GraphQLObjectType({
  name: 'AdUnit',
  description: 'A single DFP AdUnit definition',
  // interfaces: [ContentInterface],
  fields: () => ({
    id: { type: GraphQLID, },
    priority: { type: GraphQLString, },
    responsive: { type: GraphQLBoolean, },
    fluid: { type: GraphQLBoolean, },
    adSizeMapping: { type: GraphQLJSON, },
    responsiveAdSizeMapping: {
      type: GraphQLJSON,
      resolve: parentValue => {
        // eslint-disable-next-line no-unused-vars
        const { ...responsiveAdSizeMapping } = parentValue;
        return responsiveAdSizeMapping;
      },
    },
  }),
});

export default AdUnitConfigType;

export const AdImpressionConfigType = new GraphQLObjectType({
  name: 'AdUnitImpressionConfig',
  // interfaces: [ContentInterface],
  fields: () => ({
    id: { type: GraphQLID, },
    target: { type: GraphQLString, },
    frequency: { type: GraphQLString, },
  }),
});
