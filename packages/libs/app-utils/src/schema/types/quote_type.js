import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} from 'graphql';

import ImageType from './image_type';

const QuoteType = new GraphQLObjectType({
  name: 'Quote',
  fields: () => ({
    text: { type: GraphQLString, },
    position: { type: GraphQLString, },
    credit: { type: GraphQLString, },
    afterParagraph: { type: GraphQLString, },
    imagesList: { type: new GraphQLList(ImageType), },
    contentId: { type: GraphQLID, },
    contentName: { type: GraphQLString, },
    inputTemplate: { type: GraphQLString, },
  }),
});

export default QuoteType;
