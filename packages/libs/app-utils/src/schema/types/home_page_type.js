// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLString, GraphQLList, } from 'graphql';
import GraphQLJSON from 'graphql-type-json';

import TaxonomyItem from './taxonomy_item_type';
import DfpConfigType from './dfp_config_type';
import homepageMain from './home_page_main_type';

const HomePage = new GraphQLObjectType({
  name: 'Home',
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
          main: {
            type: homepageMain,
            resolve: ({ main, }) => {
              main.forEach((item, index) => {
                if (!item) {
                  main[index] = {
                    message: `Got Null in main slot of homepage, position: ${index}`,
                    kind: 'error',
                    errorCode: 6,
                  };
                }
              });
              return main;
            },
          },
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

export default HomePage;
