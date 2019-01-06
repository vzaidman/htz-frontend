// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, } from 'graphql';

const BaseItem = new GraphQLObjectType({
  name: 'BaseItem',
  fields: () => ({
    name: { type: GraphQLString, },
    url: { type: GraphQLString, },
    pages: { type: GraphQLList(BaseItem), },
  }),
});

const MadorimItem = new GraphQLObjectType({
  name: 'MadorimItemItem',
  fields: () => ({
    name: { type: GraphQLString, },
    url: { type: GraphQLString, },
    contentId: { type: GraphQLString, },
  }),
});

const NavMenu = new GraphQLObjectType({
  name: 'NavMenu',
  fields: () => ({
    navigation: { type: new GraphQLList(MadorimItem), },
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
    contentId: { type: GraphQLID, },
    contentName: { type: GraphQLString, },
  }),
});

export default NavMenu;
