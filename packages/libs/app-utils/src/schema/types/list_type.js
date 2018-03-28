// eslint-disable-next-line import/no-extraneous-dependencies
import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} from 'graphql';

import TeaserInListType from './teaser_in_list_type';

const List = new GraphQLObjectType({
  name: 'List',
  fields: () => ({
    title: { type: GraphQLString, },
    contentName: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
    hasPagination: { type: GraphQLBoolean, },
    view: { type: GraphQLString, },
    items: { type: new GraphQLList(TeaserInListType), },
  }),
});

export default List;
