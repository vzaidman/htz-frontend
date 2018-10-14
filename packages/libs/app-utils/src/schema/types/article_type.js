// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLList, GraphQLUnionType, } from 'graphql';
import { htzPageTypes, } from '@haaretz/app-utils';
import getInputTemplate from '../getInputTemplate';
import content from './content_type';
import articleData from './article_data_type';

const Article = new GraphQLList(
  new GraphQLUnionType({
    name: 'Article',
    types: [ content, articleData, ],
    resolveType: value => (Object.values(htzPageTypes)
      .filter(v => v && v.includes(value.inputTemplate))
      .length > 0
      ? articleData
      : content),
  })
);

export default Article;
