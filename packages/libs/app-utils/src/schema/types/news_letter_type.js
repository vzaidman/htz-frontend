import { GraphQLObjectType, GraphQLString, GraphQLID, } from 'graphql';

const NewLetterType = new GraphQLObjectType({
  name: 'NewsLetter',
  fields: () => ({
    segmentId: { type: GraphQLID, },
    segmentName: { type: GraphQLString, },
    inputTemplate: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
    contentName: { type: GraphQLString, },
  }),
});

export default NewLetterType;
