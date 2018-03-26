<<<<<<< HEAD
### **Using BlockLink and AboveBlockLink Components**

BlockLink component make the entire wrapped Element clickable. To exclude linking any children , easy wrap the content with AboveBlockLink Component using Render Prop method (like the example below).

#### **Styles**

The BlockLink Component wrapper is an `article` tag by default (if no tagName prop defined) which has _relative_ `position`. The nested `<a>` tag has _absolute_ `position` and a `zIndex` value of `0`. AboveBlockLink Component passes _relative_ `position` and a `zIndex` value of `1` to set it's content above the `<a>` tag.

#### **Attrs**

BlockLink passes attrs of `tabIndex = -1` and `aria-hidden = true` to Link component `attrs` prop.

_example:_
=======
### BlockLink Component
>>>>>>> feat(blocklink): add component that puts a link above its content

```jsx
<div>
  <BlockLink
    href={'https://www.haaretz.co.il/news/world/europe/.premium-1.5940125'}
    miscStyles={{
      display: 'flex',
      flexDirection: 'column',
      height: '200px',
    }}>
<<<<<<< HEAD
    <h3 style={{ color: 'red' }}>title</h3>
    <footer style={{ marginTop: 'auto' }}>
      <AboveBlockLink>
        {({ className, theme }) => (
          <span className={className} style={{ color: 'green' }}>
            I'm above the block
          </span>
=======
    <h3>title</h3>
    <footer style={{ marginTop: 'auto' }}>
      <AboveBlockLink>
        {({ className, theme }) => (
          <span className={className}>I'm above the block</span>
>>>>>>> feat(blocklink): add component that puts a link above its content
        )}
      </AboveBlockLink>
    </footer>
  </BlockLink>
</div>
```
