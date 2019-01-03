import { GraphQLObjectType, GraphQLString, GraphQLID, } from 'graphql';
import DfpBanner from './dfp_banner_type';
import List from './list_type';

const MainBlock = new GraphQLObjectType({
  name: 'HomePageMainBlock',
  fields: () => ({
    contentName: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
    inputTemplate: { type: GraphQLString, },
    slotA: { type: List, },
    slotB: { type: DfpBanner, },
    slotC: { type: List, },
  }),
});

export default MainBlock;
