Used to indicate the ranking assigned to content in teasers, e.g., in reviews.

```jsx
<div dir="rtl">
  <TeaserRank rank={3} />
</div>
```

### Rank

The ranking is set using the required `rank` prop, which takes a number, that can be set to 
either full or half half:

```jsx static
  <TeaserRank rank={3.5} />
```

The maximal rank defaults to `5` stars, but can be set differently using the `maxRank` prop, 
which takes an integer:

```jsx static
  <TeaserRank rank={7} maxRank={10} />
```

Half stars should be aligned in opposite directions between `rtl` and `ltr` layouts, which can be 
set using the `direction` prop, with the default being `rtl`:

```jsx static
  <TeaserRank direction="ltr" rank={3.5} /> stars
```

```jsx
<div style={{ textAlign: 'center' }}>
  <div dir="rtl">
    <TeaserRank rank={3.5} /> כוכבים
  </div>
  <div dir="ltr">
    <TeaserRank direction="ltr" rank={3.5} /> stars
  </div>
</div>
```

### Icon Size

By default, the icons' size is inherited from the parent's font size, but it can be overridden 
using the `size` prop, that takes a number (in rems)

```jsx
<div dir="rtl">
  <TeaserRank rank={3} size={10} />
</div>
```

A different size can be set for different breakpoints
by providing an array of objects representing media queries, in
the following structure:

```ts static
{
  from?: string,
  until?: string,
  misc?: string,
  value: number,
}
```

```jsx static
<TeaserRank 
  rank={3} 
  size={[
    { until: 'm', value: 6, },
    { from: 'm', value: 10, },
  ]}
/>
```

### Colors

The color of the enabled and disabled stars can be set using the `enabledColor` and `disabledColor`
props, respectively, which can be:

  - A `string` representing a named color.
  - A `tuple` of two `string`s, the first representing.
    a named color, and the second representing a variant
    of that named color.

```jsx static
  <TeaserRank 
    enabledColor="positive"
    disavledColor={['neutral', '-2']} 
  />
```

Different colors can be set for different breakpoints
by providing an array of objects representing media queries, in
the following structure:

```ts static
{
  from?: string,
  until?: string,
  misc?: string,
  value: (tuple|string) // as mentioned above,
}
```

``` jsx static
<TeaserRank enabledColor={{
    { until: 'xl', value: [ 'neutral', '-1' ] },
    { from: 'xl', value: 'secondary' },
  ]}
/>
```

### **Custom Styling**

Miscellaneous CSS can be applied to the span wrapping the icons using the `miscStyles` prop.

```jsx static
<TeaserRank miscStyles={{ textAlign: 'center' }} />
```

Miscellaneous styles can be set differently for different breakpoints

```jsx static
<TeaserRank miscStyles={{
  textAlign: [
    { until: 'xl', value: 'right' },
    { from: 'xl', value: 'center' },
  ],
}} />
```

### **Miscellaneous DOM Attributes**

Additional attributes can be set on the DOM element using the `attrs` prop

```jsx static
<TeaserRank
  attrs={{
    'aria-describedby': 'someDomElement',
  }}
/>
```
