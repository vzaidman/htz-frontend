// eslint-disable-next-line import/no-extraneous-dependencies
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';

import TaxonomyItem from './taxonomy_item_type';
import seoData from './seo_data_type';
import DfpConfigType from './dfp_config_type';
import sideBar from './sideBar_type';
import article from './article_type';

const Page = new GraphQLObjectType({
  name: 'Page',
  fields: () => ({
    pageType: {
      type: GraphQLString,
    },
    contentId: {
      type: new GraphQLNonNull(GraphQLID),
      resolve(parentValue) {
        return parentValue.lineage[0].contentId;
      },
    },
    contentName: {
      type: GraphQLString,
      resolve(parentValue) {
        return parentValue.lineage[0].name;
      },
    },
    lineage: {
      type: new GraphQLList(TaxonomyItem),
    },
    seoData: {
      type: seoData,
    },
    slots: {
      type: new GraphQLObjectType({
        name: 'ArticleSlots',
        fields: () => ({
          preHeader: { type: new GraphQLList(GraphQLJSON), },
          header: { type: new GraphQLList(GraphQLJSON), },
          postHeader: { type: new GraphQLList(GraphQLJSON), },
          aside: { type: sideBar, },
          article: { type: article, },
          postMain: { type: new GraphQLList(GraphQLJSON), },
          footer: { type: new GraphQLList(GraphQLJSON), },
        }),
      }),
    },
    dfpConfig: {
      type: DfpConfigType,
    },
    jsonld: { type: new GraphQLList(GraphQLString), },
  }),
});

export default Page;
