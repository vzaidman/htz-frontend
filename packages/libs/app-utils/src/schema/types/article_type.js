// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLList, GraphQLUnionType, } from 'graphql';

import getInputTemplate from '../getInputTemplate';
import content from './content_type';
import articleData from './article_data_type';
import nullFallback from './null_fallback_type';

const Article = new GraphQLList(
  new GraphQLUnionType({
    name: 'Article',
    types: [ content, articleData, nullFallback, ],
    resolveType: value => (value.inputTemplate === getInputTemplate('HtzStandardArticle')
      || value.inputTemplate === getInputTemplate('BlogArticle')
      || value.inputTemplate === getInputTemplate('MouseStoryArticle')
      || value.inputTemplate === getInputTemplate('TmStandardArticle')
      ? articleData
      : value.kind && value.kind === 'error'
        ? nullFallback
        : content),
  })
);

export default Article;
