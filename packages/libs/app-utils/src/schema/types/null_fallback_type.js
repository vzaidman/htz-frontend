import {
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
} from 'graphql';

const nullFallback = new GraphQLObjectType({
  name: 'NullFallback',
  fields: () => ({
    message: { type: GraphQLString, },
    errorCode: { type: GraphQLInt, },
    kind: { type: GraphQLString, },
  }),
});

export default nullFallback;
