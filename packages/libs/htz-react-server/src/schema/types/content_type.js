// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLString, GraphQLID, } from 'graphql';

import GraphQLJSON from 'graphql-type-json';

// import ContentInterface from './content_interface';

const ContentType = new GraphQLObjectType({
  name: 'Content',
  // interfaces: [ContentInterface],
  fields: () => ({
    contentId: { type: GraphQLID, },
    contentName: { type: GraphQLString, },
    inputTemplate: { type: GraphQLString, },
    properties: {
      type: GraphQLJSON,
      resolve: parentValue => {
        // eslint-disable-next-line no-unused-vars
        const { contentId, contentName, inputTemplate, ...properties } = parentValue;
        return properties;
      },
    },
  }),
});

export default ContentType;
