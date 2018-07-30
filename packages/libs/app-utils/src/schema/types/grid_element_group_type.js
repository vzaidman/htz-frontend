// eslint-disable-next-line import/no-extraneous-dependencies
import {
  GraphQLObjectType,
  GraphQLUnionType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} from 'graphql';

import clickTrackerBannersWrapper from './click_tracker_banner_wrapper_type';
import content from './content_type';
import dfpBanner from './dfp_banner_type';
import getSchema from '../getSchema';

const GridElementGroup = new GraphQLObjectType({
  name: 'GridElementGroup',
  fields: () => ({
    inputTemplate: { type: GraphQLString, },
    contentName: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
    items: {
      type: new GraphQLList(
        new GraphQLUnionType({
          name: 'GridElementItem',
          types: [ clickTrackerBannersWrapper, content, dfpBanner, ],
          resolveType: value => getSchema(value.inputTemplate) || content,
        })
      ),
    },
  }),
});

export default GridElementGroup;
