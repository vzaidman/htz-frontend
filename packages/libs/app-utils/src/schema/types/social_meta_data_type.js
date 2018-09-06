// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLInt, } from 'graphql';

const SocialMetaData = new GraphQLObjectType({
  name: 'SocialMetaData',
  fields: () => ({
    facebookSharesCounter: { type: GraphQLInt, },
    twitterSharesCounter: { type: GraphQLInt, },
    articleRankCounter: { type: GraphQLInt, },
    articleRankersCounter: { type: GraphQLInt, },
  }),
});

export default SocialMetaData;
