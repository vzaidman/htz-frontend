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
import ClickTrackerWrapperType from './click_tracker_banner_wrapper_type';
import getSchema from '../getSchema';

const List = new GraphQLObjectType({
  name: 'List',
  fields: () => ({
    title: { type: GraphQLString, },
    contentName: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
    inputTemplate: { type: GraphQLString, },
    hasPagination: { type: GraphQLBoolean, },
    view: { type: GraphQLString, },
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
          resolveType: value =>
            (value.inputTemplate
              ? getSchema(value.inputTemplate) || Content
              : TeaserInListType),
        })
      ),
    },
  }),
});

export default List;
