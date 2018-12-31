import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const PaywallLink = new GraphQLObjectType({
  name: 'PaywallLink',
  fields: () => ({
    text: { type: GraphQLString, },
    url: { type: GraphQLString, },
  }),
});

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
      type: PaywallLink,
    },
    deny: {
      type: PaywallLink,
    },
  }),
});

export default Paywall;
