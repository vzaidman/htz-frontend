// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLString, GraphQLList, } from 'graphql';

const SeoData = new GraphQLObjectType({
  name: 'SeoData',
  fields: () => ({
    canonicalLink: { type: GraphQLString, },
    metaDescription: { type: GraphQLString, },
    metaImage: { type: GraphQLString, },
    metaKeywords: { type: GraphQLString, },
    metaTitle: { type: GraphQLString, },
    obTitle: { type: GraphQLString, },
    ogImages: { type: new GraphQLList(GraphQLString), },
    socialDescription: { type: GraphQLString, },
    socialTitle: { type: GraphQLString, },
  }),
});

export default SeoData;
