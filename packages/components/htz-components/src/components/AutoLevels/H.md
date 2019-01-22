### AutoLevels with Section and H

`<LevelContext />`, `<Section />` and `<H />` allow us to automatically handle Heading levels in our app

These components are based on: [Managing Heading Levels In Design Systems](https://medium.com/@Heydon/managing-heading-levels-in-design-systems-18be9a746fa3)

In order to use the components our app needs to be wrapped in LevelProvider exported from LevelContext

The `<H />` Component takes care of headings h2-h6 according to the number of sections its nested in.

The user is responsible for creating the main heading `<h1 />`>

**Basic Usage**

```jsx static
<div>
  <h1>h1 is the user's responsibility</h1>
  <H>The first level H renders is a h2</H>
  <p>Some content....</p>
  <Section>
    <H>Rendering and H inside a section will give us a h3</H>
    <p>Some content....</p>
    <Section>
      <H>Rendering and H inside a nested section will give us a h4</H>
      <p>Some content....</p>
    </Section>
  </Section>
</div>
```

```jsx
<div>
  <h1>h1 is the user's responsibility</h1>
  <H>The first level H renders is a h2</H>
  <p>Some content....</p>
  <Section>
    <H>Rendering and H inside a section will give us a h3</H>
    <p>Some content....</p>
    <Section>
      <H>Rendering and H inside a nested section will give us a h4</H>
      <p>Some content....</p>
    </Section>
  </Section>
</div>
```

**Usage With offset**

`offset` prop allows manipulating the heading level

```jsx
<div>
  <h1>h1 is the user's responsibility</h1>
  <H offset={1}>I should be a h2 but I was offset to be a h3</H>
  <p>Some content....</p>
  <Section>
    <H offset={3}>I should be a h3 but I was offset to be h6 </H>
    <p>Some content....</p>
    <Section>
      <H offset={-2}>I should be a h4 but I was offset to be h2</H>
      <p>Some content....</p>
    </Section>
  </Section>
</div>
```

**Usage with Section props**

`offset` prop allows manipulating the heading level

```jsx
<div>
  <h1>h1 is the user's responsibility</h1>
  <H offset={1}>I should be a h2 but I was offset to be a h3</H>
  <p>Some content....</p>
  <Section>
    <H offset={3}>I should be a h3 but I was offset to be h6 </H>
    <p>Some content....</p>
    <Section>
      <H offset={-2}>I should be a h4 but I was offset to be h2</H>
      <p>Some content....</p>
    </Section>
  </Section>
</div>
```
