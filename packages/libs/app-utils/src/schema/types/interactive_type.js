// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLString, GraphQLID, } from 'graphql';
import GraphQLJSON from 'graphql-type-json';

const InteractiveType = new GraphQLObjectType({
  name: 'Interactive',
  fields: () => ({
    kind: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
    contentName: { type: GraphQLString, },
    inputTemplate: { type: GraphQLString, },
    properties: {
      type: GraphQLJSON,
      resolve: parentValue => {
        // eslint-disable-next-line no-unused-vars
        const {
          contentId,
          contentName,
          inputTemplate,
          kind,
          ...properties
        } = parentValue;
        return properties;
      },
    },
  }),
});

export default InteractiveType;
