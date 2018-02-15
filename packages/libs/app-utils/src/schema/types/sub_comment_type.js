// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLString, GraphQLID, } from 'graphql';

const SubCommentType = new GraphQLObjectType({
  name: 'SubComment',
  fields: () => ({
    commentId: { type: GraphQLID, },
    author: { type: GraphQLString, },
    title: { type: GraphQLString, },
    commentText: { type: GraphQLString, },
    publishingDateForDisplay: { type: GraphQLString, },
    publishingDateSortable: { type: GraphQLString, },
    reviewState: { type: GraphQLString, },
    isEditorPick: { type: GraphQLString, },
  }),
});

export default SubCommentType;
