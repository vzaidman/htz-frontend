<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents**

* [A New Comment Form](#a-new-comment-form)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

`<CommentForm />` is a component that is responsible for creating new comments.

Can be used as the main new comment form and for replying to exitsting comments.

The form is handled by `<Form />` and `<Textinput />`'s, including verification.

**Usage as a main new comment form**

```jsx
<div dir="rtl">
  <CommentForm
    initNewComment={(commentAuthor, commentHtml, parentCommentId) =>
      console.log(
        `init Comment from CommentForm.md commentAuthor: ${commentAuthor}, commentHtml: ${commentHtml} parentCommentId: ${parentCommentId}`
      )
    }
    signUpNotification={email =>
      console.log(
        `sign up comment notifications from CommentForm.md email: ${email}`
      )
    }
  />
</div>
```

**Usage as a reply form to existing comment**

```jsx
<div dir="rtl">
  <CommentForm
    closeReplyForm={() => console.log("will close reply form")}
    initNewComment={(commentAuthor, commentHtml, parentCommentId) =>
      console.log(
        `init Comment from CommentForm.md commentAuthor: ${commentAuthor}, commentHtml: ${commentHtml} parentCommentId: ${parentCommentId}`
      )
    }
    parentCommentId="12345"
    signUpNotification={email =>
      console.log(
        `sign up comment notifications from CommentForm.md email: ${email}`
      )
    }
  />
</div>
```
