// eslint-disable-next-line import/no-extraneous-dependencies
import {
  GraphQLObjectType,
  GraphQLUnionType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} from 'graphql';

import Content from './content_type';
import DfpBanner from './dfp_banner_type';
import TeaserInListType from './teaser_in_list_type';
import LinkType from './link_type';
import ClickTrackerWrapperType from './click_tracker_banner_wrapper_type';
import MarketingTeaserType from './marketing_teaser_type';

const types = new Map([
  [ 'com.polobase.ClickTrackerBannersWrapper', ClickTrackerWrapperType, ],
  [ 'com.polobase.DfpBannerElement', DfpBanner, ],
  [ 'com.tm.TeaserData', TeaserInListType, ],
]);

const List = new GraphQLObjectType({
  name: 'List',
  fields: () => ({
    title: { type: GraphQLString, },
    contentName: { type: GraphQLString, },
    description: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
    inputTemplate: { type: GraphQLString, },
    extraLinks: { type: new GraphQLList(LinkType), },
    commercialLinks: { type: new GraphQLList(LinkType), },
    marketingTeaser: { type: MarketingTeaserType, },
    hasPagination: { type: GraphQLBoolean, },
    view: { type: GraphQLString, },
    url: { type: GraphQLString, },
    urlDescription: { type: GraphQLString, },
    extraLinks: { type: new GraphQLList(LinkType), },
    items: {
      type: new GraphQLList(
        new GraphQLUnionType({
          name: 'ListItems',
          types: [
            Content,
            TeaserInListType,
            ClickTrackerWrapperType,
            DfpBanner,
          ],
          resolveType: value => types.get(value.inputTemplate) || Content,
        }),
      ),
    },
  }),
});

export default List;
