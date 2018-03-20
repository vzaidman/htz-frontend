// eslint-disable-next-line import/no-extraneous-dependencies
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';

import TaxonomyItem from './taxonomy_item_type';
import seoData from './seo_data_type';
import DfpConfigType from './dfp_config_type';

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
      type: GraphQLJSON,
      resolve: parentValue => parentValue.slots,
    },
    dfpConfig: {
      type: DfpConfigType,
    },
  }),
});

export default Page;
