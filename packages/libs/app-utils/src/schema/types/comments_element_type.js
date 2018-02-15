// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLList, GraphQLInt, } from 'graphql';

import GraphQLJSON from 'graphql-type-json';

import CommentType from './comment_type';

const CommentsElement = new GraphQLObjectType({
  name: 'CommentsElement',
  fields: () => ({
    comments: {
      type: new GraphQLList(CommentType),
    },
    commentsPlusRate: {
      type: GraphQLJSON,
    },
    commentsMinusRate: {
      type: GraphQLJSON,
    },
    totalHits: {
      type: GraphQLInt,
      resolve(parentValue) {
        if (parentValue.commentsTotals) {
          return parentValue.commentsTotals.totalHits;
        }
        return 0;
      },
    },
    properties: {
      type: GraphQLJSON,
      resolve(parentValue, args, context) {
        // eslint-disable-next-line no-unused-vars
        const {
          comments,
          commentsPlusRate,
          commentsMinusRate,
          totalHits,
          ...Properties
        } = parentValue;
        return { Properties, };
      },
    },
  }),
});

export default CommentsElement;
