import { GraphQLObjectType, GraphQLBoolean, GraphQLString, GraphQLID, } from 'graphql';
import GraphQLJSON from 'graphql-type-json';

const DfpBannerType = new GraphQLObjectType({
  name: 'DfpBanner',
  fields: () => ({
    audianceTarget: { type: GraphQLString, },
    className: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
    contentName: { type: GraphQLString, },
    hideOnSite: { type: GraphQLBoolean, },
    id: { type: GraphQLString, },
    inputTemplate: { type: GraphQLString, },
    miscStyles: { type: GraphQLJSON, },
    position: { type: GraphQLString, },
  }),
});

export default DfpBannerType;
