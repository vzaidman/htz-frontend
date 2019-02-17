// eslint-disable-next-line import/no-extraneous-dependencies
import {
  GraphQLObjectType,
  GraphQLUnionType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
} from 'graphql';

import Content from './content_type';
import List from './list_type';
import getSchema from '../getSchema';

const MobileListWrapper = new GraphQLObjectType({
  name: 'MobileListWrapper',
  fields: () => ({
    contentName: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
    inputTemplate: { type: GraphQLString, },
    loadPriority: { type: GraphQLString, },
    lazyloadDistance: { type: GraphQLInt, },
    lists: {
      type: new GraphQLList(
        new GraphQLUnionType({
          name: 'MobileListWrapperItems',
          types: [ Content, List, ],
          resolveType: value => getSchema(value.inputTemplate) || Content,
        })
      ),
    },
  }),
});

export default MobileListWrapper;
