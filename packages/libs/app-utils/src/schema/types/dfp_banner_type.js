import { GraphQLObjectType, GraphQLBoolean, GraphQLString, GraphQLID, } from 'graphql';

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
    style: { type: GraphQLString, },
    position: { type: GraphQLString, },
  }),
});

export default DfpBannerType;
