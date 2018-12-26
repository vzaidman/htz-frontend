import { GraphQLObjectType, GraphQLString, GraphQLID, } from 'graphql';

import ElementGroup from './element_group_type';
import List from './list_type';

const MainBlock = new GraphQLObjectType({
  name: 'HomePageMainBlock',
  fields: () => ({
    contentName: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
    inputTemplate: { type: GraphQLString, },
    slotA: { type: List, },
    slotB: { type: ElementGroup, },
    slotC: { type: List, },
  }),
});

export default MainBlock;
