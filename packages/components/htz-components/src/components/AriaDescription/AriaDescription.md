Creates an invisible span tag, that is readable by screen-readers. <br/>
This is used for Accessibility.

```html
<p aria-describedby="info">
    This is visible to human eyes.
    <span id="info" class="visually-hidden-class-name">This text is invisible</span>  
</p>
```

```jsx
<div
  aria-describedby="my-div-description"
  style={{ border: "1px green dashed" }}
>
  This div element is described by an invisble element.<br />
  Look at page-source to see div description.
  <AriaDescription id="my-div-description">
    This text describes the container
  </AriaDescription>
</div>
```
