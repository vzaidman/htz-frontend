// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLList, GraphQLUnionType, } from 'graphql';

import getSchema from '../getSchema';
import MainBlock from './main_block_type';
import List from './list_type';
import MiddleRuller from './middle_ruller_type';
import GridElementGroup from './grid_element_group_type';
import ElementGroup from './element_group_type';
import TabViewElement from './tab_view_element_type';
import dfpBanner from './dfp_banner_type';
import clickTrackerBannersWrapper from './click_tracker_banner_wrapper_type';
import Content from './content_type';
import HeaderNewsGroup from './header_news_group_type';
import nullFallback from './null_fallback_type';

const Article = new GraphQLList(
  new GraphQLUnionType({
    name: 'HomePageRow',
    types: [
      HeaderNewsGroup,
      MainBlock,
      List,
      GridElementGroup,
      ElementGroup,
      MiddleRuller,
      TabViewElement,
      dfpBanner,
      clickTrackerBannersWrapper,
      Content,
      nullFallback,
    ],
    resolveType: value => getSchema(value.kind || value.inputTemplate) || Content,
  })
);

export default Article;
