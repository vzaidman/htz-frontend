// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLString, } from 'graphql';
import ImageType from './image_type';

const SeoData = new GraphQLObjectType({
  name: 'SeoData',
  fields: () => ({
    canonicalUrl: { type: GraphQLString, },
    metaDescription: { type: GraphQLString, },
    metaImage: { type: GraphQLString, },
    metaKeywords: { type: GraphQLString, },
    metaTitle: { type: GraphQLString, },
    obTitle: { type: GraphQLString, },
    ogImage: { type: ImageType, },
    ogTitle: { type: GraphQLString, },
    ogDescription: { type: GraphQLString, },
    socialDescription: { type: GraphQLString, },
    socialTitle: { type: GraphQLString, },
  }),
});

export default SeoData;
