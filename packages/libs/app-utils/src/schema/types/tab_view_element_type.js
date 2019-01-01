import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID, GraphQLUnionType,
} from 'graphql';

import list from './list_type';
import clickTrackerBannersWrapper from './click_tracker_banner_wrapper_type';
import content from './content_type';
import dfpBanner from './dfp_banner_type';

const type = new Map([
  [ 'com.polobase.ClickTrackerBannersWrapper', clickTrackerBannersWrapper, ],
  [ 'com.polobase.DfpBannerElement', dfpBanner, ],
  [ 'com.tm.element.List', list, ],
]);

const TabViewElements = new GraphQLObjectType({
  name: 'TabViewElements',
  fields: () => ({
    title: { type: GraphQLString, },
    type: { type: GraphQLString, },
    viewMode: { type: GraphQLString, },
    elements: {
      type: new GraphQLList(
        new GraphQLUnionType({
          name: 'TabViewItem',
          types: [
            clickTrackerBannersWrapper,
            content,
            dfpBanner,
            list,
          ],
          resolveType: value => {
            // weird bug where get schema does not return the list type but works with the other types
            if (value.inputTemplate === 'com.tm.element.List') return list;
            return type.get(value.inputTemplate) || content;
          },
        })
      ),
    },
    inputTemplate: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
    contentName: { type: GraphQLString, },
  }),
});

export default TabViewElements;
