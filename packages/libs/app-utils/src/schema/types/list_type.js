// eslint-disable-next-line import/no-extraneous-dependencies
import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
} from 'graphql';

import Content from './content_type';
import DfpBanner from './dfp_banner_type';
import TeaserInListType from './teaser_in_list_type';
import LinkType from './link_type';
import ClickTrackerWrapperType from './click_tracker_banner_wrapper_type';
import MarketingTeaserType from './marketing_teaser_type';

const type = new Map([
  [ 'com.polobase.ClickTrackerBannersWrapper', 'clickTracker', ],
  [ 'com.polobase.DfpBannerElement', 'dfp', ],
  [ 'com.tm.TeaserData', 'teaser', ],
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
    items: {
      type: new GraphQLList(TeaserInListType),
      resolve: parentValue => (
        parentValue.items && parentValue.items.reduce((results, item) => {
          if (type.get(item.inputTemplate) === 'teaser') {
            results.push(item);
          }
          return results;
        }, [])
      ),
    },
    clickTrackers: {
      type: new GraphQLList(ClickTrackerWrapperType),
      resolve: parentValue => (
        parentValue.items && parentValue.items.reduce((results, item) => {
          if (type.get(item.inputTemplate) === 'clickTracker') {
            results.push(item);
          }
          return results;
        }, [])
      ),
    },
    dfp: {
      type: new GraphQLList(DfpBanner),
      resolve: parentValue => (
        parentValue.items && parentValue.items.reduce((results, item) => {
          if (type.get(item.inputTemplate) === 'dfp') {
            results.push(item);
          }
          return results;
        }, [])
      ),
    },
    content: {
      type: new GraphQLList(Content),
      resolve: parentValue => (
        parentValue.items && parentValue.items.reduce((results, item) => {
          if (!type.get(item.inputTemplate)) {
            results.push(item);
          }
          return results;
        }, [])
      ),
    },
    loadPriority: { type: GraphQLString, },
    lazyloadDistance: { type: GraphQLInt, },
    isLazyloadImages: { type: GraphQLBoolean, },
  }),
});

export default List;
