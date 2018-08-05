// eslint-disable-next-line import/no-extraneous-dependencies
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';

const TaxonomyItem = new GraphQLObjectType({
  name: 'TaxonomyItem',
  fields: () => ({
    pathSegment: { type: GraphQLID, },
    contentId: { type: new GraphQLNonNull(GraphQLID), },
    name: { type: new GraphQLNonNull(GraphQLString), },
    url: { type: new GraphQLNonNull(GraphQLString), },
  }),
});

export default TaxonomyItem;
