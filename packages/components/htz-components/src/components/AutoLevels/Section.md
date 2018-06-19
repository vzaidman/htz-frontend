### AutoLevels with Section and H

See detailed Docs about auto levels in `<H />` section

**Usage with props**

```jsx static
<div>
  <h1>h1</h1>
  <Section>
    <H>
      By default the Section will render a `<section />` tag
    </H>
    <p>Some content....</p>
  </Section>
  <Section tagName="div">
    <H>We can pass tagName prop and Section will render as that tag</H>
    <p>Some content....</p>
    <Section isFragment>
      <H>We can also pass isFragment prop to render as a react fragment</H>
      <p>Some content....</p>
    </Section>
  </Section>
</div>
```

```jsx
<div>
  <h1>h1</h1>
  <Section>
    <H>By default the Section will render a section tag</H>
    <p>Some content....</p>
  </Section>
  <Section tagName="div">
    <H>We can pass tagName prop and Section will render as that tag</H>
    <p>Some content....</p>
    <Section isFragment>
      <H>
        We can also pass isFragment prop to render as a react fragment,
        basically allowing us to manipulate the heading level, use with caution!
      </H>
      <p>Some content....</p>
    </Section>
  </Section>
</div>
```
