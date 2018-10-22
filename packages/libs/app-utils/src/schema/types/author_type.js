import {
  GraphQLObjectType,
  GraphQLUnionType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLID,
} from 'graphql';
import ArticleBody from './article_body_type';

import ImageType from './image_type';

const AuthorObj = new GraphQLObjectType({
  name: 'AuthorObject',
  fields: {
    image: { type: ImageType, },
    contentId: { type: GraphQLID, },
    contentName: { type: GraphQLString, },
    authorType: { type: GraphQLString, },
    email: { type: GraphQLString, },
    facebook: { type: GraphQLString, },
    gplus: { type: GraphQLString, },
    biography: { type: ArticleBody, },
    hasEmailAlerts: { type: GraphQLBoolean, },
    hasPushAlerts: { type: GraphQLBoolean, },
    inputTemplate: { type: GraphQLString, },
    twitter: { type: GraphQLString, },
    url: { type: GraphQLString, },
  },
});

const CreditObj = new GraphQLObjectType({
  name: 'CreditObject',
  fields: {
    name: { type: GraphQLString, },
  },
});

const AuthorType = new GraphQLUnionType({
  name: 'Author',
  types: [ AuthorObj, CreditObj, ],
  resolveType: value => (value.name ? CreditObj : AuthorObj),
});

export default AuthorType;
