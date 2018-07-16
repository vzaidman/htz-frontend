// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLList, GraphQLUnionType, } from 'graphql';

import content from './content_type';
import articleData from './article_data_type';

const Article = new GraphQLList(
  new GraphQLUnionType({
    name: 'Article',
    types: [ content, articleData, ],
    resolveType: value =>
      (value.inputTemplate === 'com.htz.StandardArticle' ||
      value.inputTemplate === 'com.tm.StandardArticle'
        ? articleData
        : content),
  })
);

export default Article;
