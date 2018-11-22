// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLID, } from 'graphql';

const BaseItem = new GraphQLObjectType({
  name: 'BaseItem',
  fields: () => ({
    name: { type: GraphQLString, },
    url: { type: GraphQLString, },
    contentId: { type: GraphQLString, },
    isCommercial: { type: GraphQLBoolean, },
    pages: { type: GraphQLList(BaseItem), },
  }),
});

const NavMenu = new GraphQLObjectType({
  name: 'NavMenu',
  fields: () => ({
    navigation: { type: new GraphQLList(BaseItem), },
    menu: {
      type: new GraphQLObjectType({
        name: 'MenuItem',
        fields: () => ({
          promotions: { type: new GraphQLList(BaseItem), },
          sites: { type: new GraphQLList(BaseItem), },
          items: { type: new GraphQLList(BaseItem), },
        }),
      }),
    },
    inputTemplate: { type: GraphQLString, },
    isCommercial: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
    contentName: { type: GraphQLString, },
  }),
});

export default NavMenu;
