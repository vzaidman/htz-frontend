// eslint-disable-next-line import/no-extraneous-dependencies
import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
} from 'graphql';

import TeaserInListType from './teaser_in_list_type';

const OsakaList = new GraphQLObjectType({
  name: 'OsakaList',
  fields: () => ({
    title: { type: GraphQLString, },
    listId: { type: GraphQLID, },
    viewtype: { type: GraphQLString, },
    isDuplicationAllowed: { type: GraphQLBoolean, },
    pageIndex: { type: GraphQLInt, },
    pageCount: { type: GraphQLInt, },
    items: { type: new GraphQLList(TeaserInListType), },
  }),
});

export default OsakaList;
