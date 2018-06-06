// eslint-disable-next-line import/no-extraneous-dependencies
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} from 'graphql';

import author from './author_type';
import articleBody from './article_body_type';
import date from './date_type';

const ArticleData = new GraphQLObjectType({
  name: 'ArticleData',
  fields: () => ({
    authors: { type: new GraphQLList(author), },
    body: { type: articleBody, },
    commentsElementId: { type: GraphQLID, },
    contentId: { type: GraphQLID, },
    contentName: { type: GraphQLString, },
    exclusive: { type: GraphQLString, },
    inputTemplate: { type: GraphQLString, },
    mobileExclusive: { type: GraphQLString, },
    mobileSubtitle: { type: GraphQLString, },
    mobileTitle: { type: GraphQLString, },
    modDate: { type: date, },
    pubDate: { type: date, },
    reportingFrom: { type: GraphQLString, },
    subtitle: { type: GraphQLString, },
    title: { type: GraphQLString, },
  }),
});

export default ArticleData;
