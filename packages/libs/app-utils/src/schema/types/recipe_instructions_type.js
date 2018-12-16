// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLUnionType, } from 'graphql';
// import articleBody from './article_body_type';
import getSchema from '../getSchema';

import content from './content_type';
import embed from './embed_type';
import image from './image_type';
import paragraph from './paragraph_type';

const Instructions = new GraphQLList(
  new GraphQLObjectType({
    name: 'Instructions',
    fields: () => ({
      contentId: { type: GraphQLString, },
      inputTemplate: { type: GraphQLString, },
      body: {
        type: new GraphQLList(new GraphQLUnionType({
          name: 'InstructionsBody',
          types: [ content, embed, image, paragraph, ],
          resolveType: value => getSchema(value.tag ? 'paragraph' : value.kind || value.inputTemplate)
            || content,
        })),
      },
    }),
  })
);

export default Instructions;
