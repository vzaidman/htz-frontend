const typeDefs = `

scalar JSON

type SubComment {
  commentId: String
  author: String
  title: String
  commentText: String
  publishingDateForDisplay: String
  publishingDateSortable: String
  reviewState: String
  isEditorPick: String
}

type Comment {
  commentId: String
  author: String
  title: String
  commentText: String
  publishingDateForDisplay: String
  publishingDateSortable: String
  reviewState: String
  isEditorPick: String
  subComments: [SubComment]
}

type CommentsElement {
  comments: [Comment]
  commentsPlusRate: JSON
  commentsMinusRate: JSON
  totalHits: Int
}

type Query {
  aString: String
  aBoolean: Boolean
  anInt: Int
  commentsElement(path: String): CommentsElement
}
`;

export default typeDefs;
