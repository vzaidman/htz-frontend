// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLList, GraphQLUnionType, } from 'graphql';

import getSchema from '../getSchema';
import MainBlock from './main_block_type';
import List from './list_type';
import GridElementGroup from './grid_element_group_type';
import ElementGroup from './element_group_type';
import TabViewElement from './tab_view_element_type';
import dfpBanner from './dfp_banner_type';
import clickTrackerBannersWrapper from './click_tracker_banner_wrapper_type';

const Article = new GraphQLList(
  new GraphQLUnionType({
    name: 'HomePageRow',
    types: [
      MainBlock,
      List,
      GridElementGroup,
      ElementGroup,
      TabViewElement,
      dfpBanner,
      clickTrackerBannersWrapper,
    ],
    resolveType: value => getSchema(value.inputTemplate),
  })
);

export default Article;
