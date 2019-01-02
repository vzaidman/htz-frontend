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
import getSchema from '../getSchema';

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
          resolveType: value => getSchema(value.inputTemplate),
        })
      ),
    },
    inputTemplate: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
    contentName: { type: GraphQLString, },
  }),
});

export default TabViewElements;
