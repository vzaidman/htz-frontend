import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';

import ImageUrlType from './image_url_type';

const TeaserInListType = new GraphQLObjectType({
  name: 'TeaserInList',
  fields: () => ({
    id: { type: GraphQLID, },
    path: { type: GraphQLString, },
    exclusive: { type: GraphQLString, },
    title: { type: GraphQLString, },
    subTitle: { type: GraphQLString, },
    parent: {
      type: GraphQLString,
    },
    image: { type: ImageUrlType, },
    publishDate: { type: GraphQLString, },
    lastUpdateDate: { type: GraphQLString, },
    mediaFlags: {
      type: GraphQLJSON,
      resolve: parentValue => parentValue.slots,
    },
    commentsCount: { type: GraphQLInt, },
    authorImage: { type: ImageUrlType, },
    authors: { type: new GraphQLList(GraphQLString), },
  }),
});

export default TeaserInListType;
