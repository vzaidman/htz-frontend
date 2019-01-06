- In production, use or import `Masthead` component which is a wrapped component that gets data through query.


### MastheadElement examples

```jsx
<div style={{ direction: 'rtl', marginBottom: '400px' }}>
  <WrappedMasthead
    hostname="http://www.haaretz.co.il/"
    contentId="Masthead"
    Logo={() => <div>Logo</div>}
    includeMadorimNavigation
    mastheadFullWidthBorder
  />
</div>
```
