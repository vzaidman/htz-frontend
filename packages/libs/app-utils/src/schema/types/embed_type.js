import { GraphQLObjectType, GraphQLString, GraphQLID, } from 'graphql';
import GraphQLJSON from 'graphql-type-json';

const EmbedType = new GraphQLObjectType({
  name: 'Embed',
  fields: () => ({
    content: { type: GraphQLString, },
    caption: { type: GraphQLString, },
    credit: { type: GraphQLString, },
    embedType: { type: GraphQLString, },
    elementType: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
    contentName: { type: GraphQLString, },
    inputTemplate: { type: GraphQLString, },
    settings: { type: GraphQLJSON, },
    viewMode: { type: GraphQLString, },
    position: { type: GraphQLString, },
  }),
});

export default EmbedType;
