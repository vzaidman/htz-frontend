// eslint-disable-next-line import/no-extraneous-dependencies
import {
  GraphQLObjectType,
  GraphQLUnionType,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLID,
} from 'graphql';

import clickTrackerBannersWrapper from './click_tracker_banner_wrapper_type';
import content from './content_type';
import dfpBanner from './dfp_banner_type';
import list from './list_type';
import tabsElement from './tab_view_element_type';
import getSchema from '../getSchema';

const GridElementGroup = new GraphQLObjectType({
  name: 'GridElementGroup',
  fields: () => ({
    inputTemplate: { type: GraphQLString, },
    contentName: { type: GraphQLString, },
    title: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
    items: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: 'GridElementItem',
          fields: () => ({
            width: {
              type: new GraphQLList(
                new GraphQLObjectType({
                  name: 'GridElementItemWidth',
                  fields: () => ({
                    from: { type: GraphQLString, },
                    until: { type: GraphQLString, },
                    value: { type: GraphQLFloat, },
                  }),
                })
              ),
            },
            content: {
              type: new GraphQLUnionType({
                name: 'GridElementItemContent',
                types: [
                  clickTrackerBannersWrapper,
                  content,
                  dfpBanner,
                  list,
                  tabsElement,
                ],
                resolveType: value => {
                  // weird bug where get schema does not return the list type but works with the other types
                  if (value.inputTemplate === 'com.tm.element.List') return list;
                  return getSchema(value.inputTemplate) || content;
                },
              }),
            },
          }),
        })
      ),
    },
  }),
});

export default GridElementGroup;
