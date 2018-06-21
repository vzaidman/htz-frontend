<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents**

- [CommentsWithApollo](#commentswithapollo)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### CommentsWithApollo

Manages fetching and writing data from/to the graphql endpoint and rendering the `<CommentSection/>` with all of its required props

Most of the props required by `<CommentsWithApollo/>` are passed implicitly by Apollo.

The consumer is responsible for passing the comments contentId and the articleId (which is the article contentId).

Please note that this data is from the local machine, if there are errors, check if your machine has the following content, and that your machine is up.

```jsx static
<CommentsWithApollo contentId="7.1809" articleId="1.2091" />
```

```jsx
<div dir="rtl">
  <CommentsWithApollo contentId="7.1809" articleId="1.2091" />
</div>
```
