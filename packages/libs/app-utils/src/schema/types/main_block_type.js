import { GraphQLObjectType, GraphQLString, GraphQLID, } from 'graphql';

import ElementGroup from './element_group_type';
import ListInit from './list_init_type';

const MainBlock = new GraphQLObjectType({
  name: 'HomePageMainBlock',
  fields: () => ({
    contentName: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
    inputTemplate: { type: GraphQLString, },
    slotA: { type: ListInit, },
    slotB: { type: ElementGroup, },
    slotC: { type: ListInit, },
  }),
});

export default MainBlock;
