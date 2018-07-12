// eslint-disable-next-line import/no-extraneous-dependencies
import {
  GraphQLObjectType,
  GraphQLUnionType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
} from 'graphql';

import gridElementGroup from './grid_element_group_type';
import content from './content_type';
import dfpBanner from './dfp_banner_type';
import list from './list_type';

const types = new Map([
  [ 'com.tm.GridElementGroup', gridElementGroup, ],
  [ 'com.polobase.DfpBannerElement', dfpBanner, ],
  [ 'com.tm.element.List', list, ],
]);

const ElementGroup = new GraphQLObjectType({
  name: 'ElementGroup',
  fields: () => ({
    contentLists: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: 'ElementGroupItem',
          fields: () => ({
            displayDuration: { type: GraphQLInt, },
            content: {
              type: new GraphQLUnionType({
                name: 'ElementGroupContent',
                types: [ gridElementGroup, content, dfpBanner, list, ],
                resolveType: value => types.get(value.inputTemplate) || content,
              }),
            },
          }),
        })
      ),
    },
    hideOnSite: { type: GraphQLBoolean, },
    inputTemplate: { type: GraphQLString, },
    contentName: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
    totalDisplay: {
      type: GraphQLInt,
      resolve: parentValue => {
        const { contentLists, } = parentValue;
        let duration = 0;
        // eslint-disable-next-line no-return-assign
        contentLists.map(item => (duration += item.displayDuration));
        return duration;
      },
    },
  }),
});

export default ElementGroup;
