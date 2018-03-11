// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLString, GraphQLBoolean, } from 'graphql';
import GraphQLJSON from 'graphql-type-json';

// import ContentType from './content_type';
import AdUnitConfigType, { AdImpressionConfigType, } from './ad_unit_type';

const DfpConfigType = new GraphQLObjectType({
  name: 'dfpConfig',
  fields: () => ({
    // adSlotConfig: {
    //   type: AdUnitConfigType,
    //   resolve(parentValue, args, context) {
    //     // eslint-disable-next-line no-unused-vars
    //     console.log(args);
    //     return parentValue[];
    //   },
    // },
    adSlotConfig: {
      type: GraphQLJSON,
    },
    adManagerConfig: {
      type: new GraphQLObjectType({
        name: 'adManagerConfig',
        fields: () => ({
          network: { type: GraphQLString, },
          adUnitBase: { type: GraphQLString, },
        }),
      }),
    },
    conflictManagementConfig: {
      type: GraphQLJSON,
    },
    impressionManagerConfig: {
      type: GraphQLJSON,
    },
    googleGlobalSettings: {
      type: new GraphQLObjectType({
        name: 'googleGlobalSettings',
        fields: () => ({
          enableSingleRequest: { type: GraphQLBoolean, },
          enableAsyncRendering: { type: GraphQLBoolean, },
          breakpointType: { type: GraphQLString, },
        }),
      }),
    },
  }),
});
export default DfpConfigType;
