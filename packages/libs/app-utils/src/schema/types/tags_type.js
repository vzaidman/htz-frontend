import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} from 'graphql';

const tag = new GraphQLObjectType({
  name: 'Tag',
  fields: () => ({
    url: { type: GraphQLString, },
    inputTemplate: { type: GraphQLString, },
    contentName: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
  }),
});

const TagsType = new GraphQLObjectType({
  name: 'Tags',
  fields: () => ({
    tagsList: { type: new GraphQLList(tag), },
    elementType: { type: GraphQLString, },
  }),
});

export default TagsType;
