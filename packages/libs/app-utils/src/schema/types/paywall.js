import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const Paywall = new GraphQLObjectType({
  name: 'Paywall',
  fields: () => ({
    slotLocation: {
      type: GraphQLString,
    },
    title: {
      type: GraphQLString,
    },
    text: {
      type: GraphQLString,
    },
    confirm: {
      type: new GraphQLObjectType({
        name: 'Confirm',
        fields: () => ({
          text: { type: GraphQLString, },
          url: { type: GraphQLString, },
        }),
      }),
    },
  }),
});

export default Paywall;
