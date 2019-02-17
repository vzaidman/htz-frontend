// eslint-disable-next-line import/no-extraneous-dependencies
import {
  GraphQLObjectType,
  GraphQLUnionType,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';

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
    loadPriority: { type: GraphQLString, },
    lazyloadDistance: { type: GraphQLInt, },
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
            miscStyles: { type: GraphQLJSON, },
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
                resolveType: value => getSchema(value.inputTemplate),
              }),
            },
          }),
        })
      ),
    },
  }),
});

export default GridElementGroup;
