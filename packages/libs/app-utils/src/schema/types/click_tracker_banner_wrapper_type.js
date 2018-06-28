// eslint-disable-next-line import/no-extraneous-dependencies
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
} from 'graphql';

import BannerType from './click_tracker_banner_type';

const ClickTrackerBannersWrapper = new GraphQLObjectType({
  name: 'ClickTrackerBannersWrapper',
  fields: () => ({
    inputTemplate: { type: GraphQLString, },
    contentName: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
    totalPercentage: { type: GraphQLInt, },
    viewModes: {
      type: new GraphQLObjectType({
        name: 'WrappersViewModes',
        fields: () => ({
          viewModeHtzMobile: { type: GraphQLString, },
          viewModeTmMobile: { type: GraphQLString, },
          viewModeHtz: { type: GraphQLString, },
          viewModeJson: { type: GraphQLString, },
        }),
      }),
    },
    banners: { type: new GraphQLList(BannerType), },
  }),
});

export default ClickTrackerBannersWrapper;
