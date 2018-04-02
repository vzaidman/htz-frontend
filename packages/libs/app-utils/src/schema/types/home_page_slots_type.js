import { GraphQLObjectType, GraphQLList, } from 'graphql';
import GraphQLJSON from 'graphql-type-json';

const HomePageSlotsType = new GraphQLObjectType({
  name: 'HomePageSlots',
  fields: () => ({
    header: { type: new GraphQLList(GraphQLJSON), },
    topwide: { type: new GraphQLList(GraphQLJSON), },
    topwidesecondary: { type: new GraphQLList(GraphQLJSON), },
    aside: { type: new GraphQLList(GraphQLJSON), },
    main: { type: new GraphQLList(GraphQLJSON), },
    bottom: { type: new GraphQLList(GraphQLJSON), },
    footer: { type: new GraphQLList(GraphQLJSON), },
  }),
});

export default HomePageSlotsType;
