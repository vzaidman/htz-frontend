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
import TeaserInListType from './teaser_in_list_type';
import ClickTrackerWrapperType from './click_tracker_banner_wrapper_type';

const List = new GraphQLObjectType({
  name: 'List',
  fields: () => ({
    title: { type: GraphQLString, },
    contentName: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
    hasPagination: { type: GraphQLBoolean, },
    view: { type: GraphQLString, },
    items: {
      type: new GraphQLList(
        new GraphQLUnionType({
          name: 'ListItems',
          types: [ Content, TeaserInListType, ClickTrackerWrapperType, ],
          resolveType: value =>
            (value.inputTemplate
              ? value.inputTemplate ===
                'com.polobase.ClickTrackerBannersWrapper'
                ? ClickTrackerWrapperType
                : Content
              : TeaserInListType),
        })
      ),
    },
  }),
});

export default List;
