import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
  GraphQLID,
} from 'graphql';

import author from './author_type';
import ImageType from './image_type';
import MediaType from './media_type';
import GraphQLDate from './date_type';

const relatedArticle = new GraphQLObjectType({
  name: 'RelatedArticle',
  fields: {
    title: { type: GraphQLString, },
    path: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
  },
});

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
    commentsCounts: { type: GraphQLInt, },
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
    rank: { type: GraphQLFloat, },
    titleMobile: { type: GraphQLString, },
    hash: { type: GraphQLString, },
    authors: { type: new GraphQLList(author), },
    relatedArticles: {
      type: new GraphQLList(relatedArticle),
    },
    inputTemplate: { type: GraphQLString, },
  }),
});

export default TeaserInListType;
