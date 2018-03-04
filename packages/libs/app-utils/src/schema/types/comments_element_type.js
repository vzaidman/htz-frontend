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
        const {
          /* eslint-disable no-unused-vars */
          comments,
          commentsPlusRate,
          commentsMinusRate,
          totalHits,
          /* eslint-enable no-unused-vars */
          ...Properties
        } = parentValue;
        return { Properties, };
      },
    },
  }),
});

export default CommentsElement;
