// eslint-disable-next-line import/no-extraneous-dependencies
import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} from 'graphql';

const NewsItem = new GraphQLObjectType({
  name: 'NewsItem',
  fields: () => ({
    href: { type: GraphQLString, },
    isCommercial: { type: GraphQLBoolean, },
    contentId: { type: GraphQLID, },
    inputTemplate: { type: GraphQLString, },
    contentName: { type: GraphQLString, },
  }),
});

const HeaderNewsGroup = new GraphQLObjectType({
  name: 'HeaderNewsGroup',
  fields: () => ({
    contentLists: { type: new GraphQLList(NewsItem), },
    hideOnSite: { type: GraphQLBoolean, },
    contentId: { type: GraphQLID, },
    inputTemplate: { type: GraphQLString, },
    contentName: { type: GraphQLString, },
  }),
});

export default HeaderNewsGroup;
