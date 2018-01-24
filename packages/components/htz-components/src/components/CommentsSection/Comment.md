<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents**

* [A New Comment Form](#a-new-comment-form)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

`<Comment />` is responsible for displaying a single Comment, that may have `subComments`.

It can also be a `subComment`

**A simple Comment with minumum required props**

```jsx
<div dir="rtl">
  <Comment
    key="comment.commentId"
    commentId="comment.commentId"
    author="comment.author"
    title="comment.title"
    commentText="comment.commentText"
    publishingDateForDisplay="10:30"
    commentNumber={1 || ""}
    isEditorPick="false"
    initVote={(commentId, rate) =>
      console.warn(
        `initVote from Comment.md commentId: ${commentId} rate: ${rate}`
      )
    }
    reportAbuse={commentId =>
      console.warn(`report abuse from Comment.md comment Id: ${commentId}`)
    }
    initNewComment={(commentAuthor, commentHtml, parentCommentId) =>
      console.warn(
        `init Comment from Comment.md commentAuthor: ${commentAuthor}, commentHtml: ${commentHtml} parentCommentId: ${parentCommentId}`
      )
    }
    signUpNotification={email =>
      console.warn(
        `sign up comment notifications from Comment.md email: ${email}`
      )
    }
  />
</div>
```

**A Highlited Comment: EditorPick/UsersPick**

```jsx
<div dir="rtl">
  <Comment
    key="comment.commentId"
    commentId="comment.commentId"
    author="comment.author"
    title="comment.title"
    commentText="comment.commentText"
    publishingDateForDisplay="10:30"
    commentNumber={1 || ""}
    isEditorPick="true"
    initVote={(commentId, rate) =>
      console.warn(
        `initVote from Comment.md commentId: ${commentId} rate: ${rate}`
      )
    }
    reportAbuse={commentId =>
      console.warn(`report abuse from Comment.md comment Id: ${commentId}`)
    }
    initNewComment={(commentAuthor, commentHtml, parentCommentId) =>
      console.warn(
        `init Comment from Comment.md commentAuthor: ${commentAuthor}, commentHtml: ${commentHtml} parentCommentId: ${parentCommentId}`
      )
    }
    signUpNotification={email =>
      console.warn(
        `sign up comment notifications from Comment.md email: ${email}`
      )
    }
  />
</div>
```

**A Comment with SubComments**

```jsx
<div dir="rtl">
  <Comment
    key="comment.commentId"
    commentId="comment.commentId"
    author="comment.author"
    title="comment.title"
    commentText="comment.commentText"
    publishingDateForDisplay="10:30"
    commentNumber={1 || ""}
    isEditorPick="false"
    initVote={(commentId, rate) =>
      console.warn(
        `initVote from Comment.md commentId: ${commentId} rate: ${rate}`
      )
    }
    reportAbuse={(commentId, captchaKey) =>
      console.warn(
        `report abuse from Comment.md comment Id: ${commentId}  captchaKey: ${captchaKey}`
      )
    }
    initNewComment={(commentAuthor, commentHtml, parentCommentId) =>
      console.warn(
        `init Comment from Comment.md commentAuthor: ${commentAuthor}, commentHtml: ${commentHtml} parentCommentId: ${parentCommentId}`
      )
    }
    signUpNotification={email =>
      console.warn(
        `sign up comment notifications from Comment.md email: ${email}`
      )
    }
    subComments={[
      {
        author: "רן",
        title: "@הורנר@",
        commentText:
          "לגרמניה יש אובססיה להציג את ישראל של היום כגרמניה הנאצית והם לא חוסכים באמצעים. יש הרבה מאוד אנשים שמתפdfgdfsgsdfgגכדעגכעדגכעגדכעדגכעדגכעגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים מגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתושיתוף הפעולה. הסיבה לאובססיה היא לא אנטישמיות קלסית זה אינטרס גרמני ברור",
        publishingDateForDisplay: "09:36",
        commentId: "19.9522362",
        reviewState: "nr",
        isEditorPick: "false",
        publishingDateSortable: "20171119002050"
      },
      {
        author: "רן",
        title: "@הורנר@",
        commentText: "testing",
        publishingDateForDisplay: "09:36",
        commentId: "19.9522999",
        reviewState: "nr",
        isEditorPick: "false",
        publishingDateSortable: "20171119002070"
      }
    ]}
  />
</div>
```
