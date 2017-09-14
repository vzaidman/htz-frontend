// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, } from 'graphql';
import CommentInput from './types/comment_input_type';
import newCommentResponseType from './types/new_comment_response_type';

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addComment: {
      type: newCommentResponseType,
      args: { newComment: { type: CommentInput, }, },
      resolve(parentValue, { newComment, }, context) {
        return context.cmlinkCommentPoster(newComment).then(data => data);
      },
    },
  },
});

export default mutation;
