import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
} from 'graphql';

import author from './author_type';
import ImageType from './image_type';
import GraphQLDate from './date_type';
import Author from './author_type';

const TeaserInListType = new GraphQLObjectType({
  name: 'TeaserInList',
  fields: () => ({
    image: { type: ImageType, },
    firstParagraph: { type: GraphQLString, },
    publishDate: { type: GraphQLDate, },
    contentId: { type: GraphQLID, },
    exclusiveMobile: { type: GraphQLString, },
    title: { type: GraphQLString, },
    commentsCount: { type: GraphQLInt, },
    path: { type: GraphQLString, },
    subtitleMobile: { type: GraphQLString, },
    isPremiumContent: { type: GraphQLBoolean, },
    lastUpdate: { type: GraphQLDate, },
    subTitle: { type: GraphQLString, },
    authorImage: { type: ImageType, },
    mediaFlags: {
      type: new GraphQLObjectType({
        name: 'MediaFlags',
        fields: () => ({
          video: { type: GraphQLBoolean, },
          html_embed: { type: GraphQLBoolean, },
          gallery: { type: GraphQLBoolean, },
        }),
      }),
    },
    exclusive: { type: GraphQLString, },
    titleMobile: { type: GraphQLString, },
    hash: { type: GraphQLString, },
    authors: { type: new GraphQLList(author), },
  }),
});

export default TeaserInListType;
