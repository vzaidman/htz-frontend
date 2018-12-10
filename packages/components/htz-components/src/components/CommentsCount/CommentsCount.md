### Comments Count

*Examples:*

**with no props (default with no commentsCount text)**
```jsx
<div dir="rtl" style={{ maxWidth: "7rem" }}>
  <CommentsCount />
</div>
```

**example with props (commentsCount text included)**
```jsx
<div dir="rtl" style={{ maxWidth: "10rem" }}>
  <CommentsCount size={2} commentsCount={32} color={["primary", "-1"]} />
</div>
```

**example with miscStyles (commentsCount text included)**
```jsx
<div dir="rtl" style={{ maxWidth: "10rem" }}>
  <CommentsCount 
    size={3}
    commentsCount={12}
    color={["quaternary", "+3"]}
    miscStyles={{ display: 'block', marginInlineEnd: '5rem', }} 
    textMiscStyles={{ paddingInlineStart: '0.2rem'}}
   />
</div>
```


