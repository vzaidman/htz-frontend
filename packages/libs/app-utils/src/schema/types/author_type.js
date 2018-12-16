import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLID,
} from 'graphql';

import ImageType from './image_type';
import ArticleBody from './article_body_type';

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: {
    image: { type: ImageType, },
    contentId: { type: GraphQLID, },
    contentName: { type: GraphQLString, },
    authorType: { type: GraphQLString, },
    email: { type: GraphQLString, },
    biography: { type: ArticleBody, },
    facebook: { type: GraphQLString, },
    gplus: { type: GraphQLString, },
    hasEmailAlerts: { type: GraphQLBoolean, },
    hasPushAlerts: { type: GraphQLBoolean, },
    inputTemplate: { type: GraphQLString, },
    twitter: { type: GraphQLString, },
    url: { type: GraphQLString, },
  },
});

export default AuthorType;
