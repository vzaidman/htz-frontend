### Title Component

A generic title component for use within teasers and articles.
Creates an HTML _`H(n)`_ tag. (H1, H2, H3 ...)

```jsx
<Title
  isBlock={false}
  fontSize={[
    { until: 'm', value: 3, },
    { from: 'm', until: 'l', value: 4, },
    { from: 'l', value: 5, },
  ]}
  level={1}
  text="ישראל שומרת על ריסון בעזה ומאמצת גישה תקיפה בגבול הצפון"
/>
```
