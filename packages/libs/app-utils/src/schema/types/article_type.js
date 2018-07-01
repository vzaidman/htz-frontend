// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLList, GraphQLUnionType, } from 'graphql';

import content from './content_type';
import articleData from './article_data_type';
import articleHeader from './article_header_type';

const Article = new GraphQLList(
  new GraphQLUnionType({
    name: 'Article',
    types: [ content, articleData, articleHeader, ],
    resolveType: value =>
      (value.inputTemplate === 'com.htz.StandardArticle' ||
      value.inputTemplate === 'com.tm.StandardArticle'
        ? articleData
        : value.inputTemplate === 'com.htz.ArticleHeaderElement'
          ? articleHeader
          : content),
  })
);

export default Article;
