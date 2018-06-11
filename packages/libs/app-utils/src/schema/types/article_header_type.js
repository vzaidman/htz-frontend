// eslint-disable-next-line import/no-extraneous-dependencies
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} from 'graphql';

import author from './author_type';
import image from './image_type';
import date from './date_type';

const ArticleHeader = new GraphQLObjectType({
  name: 'ArticleHeader',
  fields: () => ({
    contentId: { type: GraphQLID, },
    contentName: { type: GraphQLString, },
    inputTemplate: { type: GraphQLString, },
    data: {
      type: new GraphQLObjectType({
        name: 'HeaderData',
        fields: () => ({
          image: { type: image, },
          authors: { type: new GraphQLList(author), },
          exclusive: { type: GraphQLString, },
          mobileExclusive: { type: GraphQLString, },
          mobileSubtitle: { type: GraphQLString, },
          mobileTitle: { type: GraphQLString, },
          modDate: { type: date, },
          pubDate: { type: date, },
          reportingFrom: { type: GraphQLString, },
          subtitle: { type: GraphQLString, },
          title: { type: GraphQLString, },
        }),
      }),
    },
  }),
});

export default ArticleHeader;
