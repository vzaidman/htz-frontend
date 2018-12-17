// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLString, GraphQLList, } from 'graphql';
import GraphQLJSON from 'graphql-type-json';

import TaxonomyItem from './taxonomy_item_type';
import DfpConfigType from './dfp_config_type';
import homepageMain from './home_page_main_type';

const Page = new GraphQLObjectType({
  name: 'HomePage',
  fields: () => ({
    pageType: {
      type: GraphQLString,
    },
    lineage: {
      type: new GraphQLList(TaxonomyItem),
    },
    // seoData: {
    //   type: seoData,
    // },
    slots: {
      type: new GraphQLObjectType({
        name: 'HomePageSlots',
        fields: () => ({
          preHeader: { type: new GraphQLList(GraphQLJSON), },
          header: { type: new GraphQLList(GraphQLJSON), },
          postHeader: { type: new GraphQLList(GraphQLJSON), },
          main: { type: homepageMain, },
          postMain: { type: new GraphQLList(GraphQLJSON), },
          footer: { type: new GraphQLList(GraphQLJSON), },
        }),
      }),
    },
    dfpConfig: {
      type: DfpConfigType,
    },
  }),
});

export default Page;
