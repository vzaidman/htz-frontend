### WrappedComments

Manages fetching and writing data from/to the graphql endpoint and rendering the `<CommentSection/>` with all of its required props

`<WrappedComments/>` gets the article and commentsElementId from the apollo store and then queries the data needed from our graphql endpoint based on those id's

```jsx static
<WrappedComments />
```

```jsx
<div dir="rtl">
  <WrappedComments />
</div>
```
