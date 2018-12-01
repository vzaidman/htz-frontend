// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLList, GraphQLUnionType, } from 'graphql';

import getInputTemplate from '../getInputTemplate';
import content from './content_type';
import articleData from './article_data_type';

const Article = new GraphQLList(
  new GraphQLUnionType({
    name: 'Article',
    types: [ content, articleData, ],
    resolveType: value => (value.inputTemplate === getInputTemplate('HtzStandardArticle')
      || value.inputTemplate === getInputTemplate('BlogArticle')
      || value.inputTemplate === getInputTemplate('MouseStoryArticle')
      || value.inputTemplate === getInputTemplate('TmStandardArticle')
      ? articleData
      : content),
  })
);

export default Article;
