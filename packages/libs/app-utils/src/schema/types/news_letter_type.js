import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLID,
} from 'graphql';

const NewLetterType = new GraphQLObjectType({
  name: 'NewsLetter',
  fields: () => ({
    renderFrequency: { type: GraphQLInt, },
    segmentId: { type: GraphQLID, },
    segmentName: { type: GraphQLString, },
    inputTemplate: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
    contentName: { type: GraphQLString, },
  }),
});

export default NewLetterType;
