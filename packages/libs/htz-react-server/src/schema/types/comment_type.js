// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, } from 'graphql';

import SubCommentType from './sub_comment_type';

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    commentId: { type: GraphQLID, },
    author: { type: GraphQLString, },
    title: { type: GraphQLString, },
    commentText: { type: GraphQLString, },
    publishingDateForDisplay: { type: GraphQLString, },
    reviewState: { type: GraphQLString, },
    isEditorPick: { type: GraphQLString, },
    subComments: {
      type: new GraphQLList(SubCommentType),
    },
  }),
});

export default CommentType;
