import { GraphQLObjectType, GraphQLString, GraphQLList, } from 'graphql';

import article from './teaser_in_list_type';

const RelatedArticlesType = new GraphQLObjectType({
  name: 'RelatedArticles',
  fields: () => ({
    articles: { type: new GraphQLList(article), },
    elementType: { type: GraphQLString, },
  }),
});

export default RelatedArticlesType;
