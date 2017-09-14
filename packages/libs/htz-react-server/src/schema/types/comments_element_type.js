// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLList, } from 'graphql';
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
    properties: {
      type: GraphQLJSON,
      resolve(parentValue, args, context) {
        // eslint-disable-next-line no-unused-vars
        const { comments, commentsPlusRate, commentsMinusRate, ...Properties } = parentValue;
        return { Properties, };
      },
    },
  }),
});

export default CommentsElement;
