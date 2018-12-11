import {
  GraphQLObjectType,
  GraphQLUnionType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLID,
} from 'graphql';

import ImageType from './image_type';
import ArticleBody from './article_body_type';

const AuthorObj = new GraphQLObjectType({
  name: 'AuthorObject',
  fields: {
    name: { type: GraphQLString, },
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

const CreditObj = new GraphQLObjectType({
  name: 'CreditObject',
  fields: {
    name: { type: GraphQLString, },
  },
});

const AuthorType = new GraphQLUnionType({
  name: 'Author',
  types: [ AuthorObj, CreditObj, ],
  resolveType: value => (value.contentId ? AuthorObj : CreditObj),
});

export default AuthorType;
