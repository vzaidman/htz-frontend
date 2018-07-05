### **Text Link component**

`<TextLink />` is a ui component that styles our links.

By default text link will render `<HtzLink/>` component.

Passing a tagName prop will override using `<HtzLink/>`

All other props are passed to the rendered Element

Render as a default HtzLink

```jsx
<TextLink href="https://www.haaretz.co.il" content="Haaretz" />
```

Render as a button

```jsx
<TextLink
  tagName="button"
  href="https://www.haaretz.co.il"
  onClick={() => console.log('I can get an onClick')}>
  Haaretz
</TextLink>
```
