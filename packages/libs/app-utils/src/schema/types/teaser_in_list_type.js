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
import MediaType from './media_type';
import GraphQLDate from './date_type';

const TeaserInListType = new GraphQLObjectType({
  name: 'TeaserInList',
  fields: () => ({
    image: { type: ImageType, },
    media: { type: MediaType, },
    firstParagraph: { type: GraphQLString, },
    publishDate: { type: GraphQLDate, },
    contentId: { type: GraphQLID, },
    representedContent: { type: GraphQLID, },
    exclusiveMobile: { type: GraphQLString, },
    title: { type: GraphQLString, },
    commentsCount: { type: GraphQLInt, },
    path: { type: GraphQLString, },
    subtitleMobile: { type: GraphQLString, },
    isPremiumContent: { type: GraphQLBoolean, },
    lastUpdate: { type: GraphQLDate, },
    subtitle: { type: GraphQLString, },
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
