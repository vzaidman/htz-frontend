import { GraphQLScalarType, } from 'graphql';

const GraphQLImageAspects = new GraphQLScalarType({
  name: 'ImageAspects',
  serialize: value => value,
  parseValue: value => value,
  parseLiteral(valueNode) {
    // eslint-disable-next-line no-unused-vars
    const { kind, value, } = valueNode;
    return value;
  },
});

export default GraphQLImageAspects;
