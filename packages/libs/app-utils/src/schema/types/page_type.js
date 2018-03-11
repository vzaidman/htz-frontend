// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull, } from 'graphql';

import TaxonomyItem from './taxonomy_item_type';
import seoData from './seo_data_type';
import SlotType from './slot_type';
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
      type: new GraphQLList(SlotType),
      resolve: parentValue =>
        Object.keys(parentValue.slots).map(name => ({
          name,
          content: parentValue.slots[name] || [],
        })),
    },
    dfpConfig: {
      type: DfpConfigType,
    },
  }),
});

export default Page;
