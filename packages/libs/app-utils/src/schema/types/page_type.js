// eslint-disable-next-line import/no-extraneous-dependencies
import {
  GraphQLObjectType,
  GraphQLUnionType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} from 'graphql';

import StandardArticleSlotsType from './standard_article_slots_type';
import HomePageSlotsType from './home_page_slots_type';

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
      type: new GraphQLUnionType({
        name: 'Slots',
        types: [ StandardArticleSlotsType, HomePageSlotsType, ],
        resolveType: value =>
          (value.topwidesecondary ? HomePageSlotsType : StandardArticleSlotsType),
      }),
    },
    dfpConfig: {
      type: DfpConfigType,
    },
  }),
});

export default Page;
