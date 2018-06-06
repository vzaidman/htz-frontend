import { GraphQLObjectType, GraphQLString, GraphQLList, } from 'graphql';
import GraphQLJSON from 'graphql-type-json';

const attribute = new GraphQLObjectType({
  name: 'Attribute',
  fields: () => ({
    key: { type: GraphQLString, },
    value: { type: GraphQLString, },
  }),
});

const ParagraphType = new GraphQLObjectType({
  name: 'Paragraph',
  fields: () => ({
    attributes: { type: new GraphQLList(attribute), },
    tag: { type: GraphQLString, },
    content: { type: GraphQLJSON, },
  }),
});

export default ParagraphType;
