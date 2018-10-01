`<CardContent />` is part of the internal API of a `<Card />` component,
intended to consistently position and give semantic meaning to elements
within a card.

```jsx static
<Card>
  <CardContent>Card content goes here</CardContent>
</Card>
```


### **Underlying Element**

By default, a `<CardContent />` component will be rendered as a 'div'. 
However, being sucha  generic UI component, it would only make sense that 
different use case require the need for different HTML semantics.

This can be done using the `tagName` prop:

```jsx static
<CardContent tagName="section" />
```


### **Background Color**

The background color of a `<CardContent />` component is not set by default,
but can be set using the `backgroundColor` prop, which can be:

  - A `string` representing a named color.
  - A `tuple` of two `string`s, the first representing.
    a named color, and the second representing a variant
    of that named color.

```jsx static
  <CardContent backgroundColor={['neutral', '-2']} />
```

A different background color can be set for different breakpoints
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
<CardContent backgroundColor={[
    { until: 'xl', value: [ 'neutral', '-1' ] },
    { from: 'xl', value: 'secondary' },
  ]}
/>
```


### **Color**

The color of a `<CardContent />` component is not set by default,
but can be set using the `color` prop, which can be:

  - A `string` representing a named color.
  - A `tuple` of two `string`s, the first representing.
    a named color, and the second representing a variant
    of that named color.

```jsx static
  <CardContent color={['neutral', '-2']} />
```

A different color can be set for different breakpoints
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
<CardContent color={[
    { until: 'xl', value: [ 'neutral', '-1' ] },
    { from: 'xl', value: 'secondary' },
  ]}
/>
```


### **Padding**

The default padding of a `<CardContent />` component as set in the theme
but can be changed using the `padding` prop, which can be:

  - A `number` representing `rem` values.
  - An `array` of between 1 to 4 `number`s, representing padding values in rem
    in the following order: `padding-top`, `padding-inline-start`, `padding-bottom`, 
    `padding-inline-end`.

```jsx static
<CardContent padding="2" /> // 2 rems of padding all around

/* or */
<CardContent padding={[2]} /> // 2 rems of padding all around

/* or */
<CardContent padding={[2, 4]} /> // 2 rems of padding top & bottom, 
                                 // 4 from sides

/* or */
<CardContent padding={[2, 4, 4]} /> // 2 rems of padding top 
                                    // 4 from sides
                                    // 4 from bottom

/* or */
<CardContent padding={[2, 4, 4, 2]} /> // 2 rems of padding top 
                                       // 4 from inline-start, 
                                       // 4 from bottom, 
                                       // 2 from inline-end
```

Different padding values can be set for different breakpoints
by providing an array of objects representing media queries, in
the following structure:

```ts static
{
  from?: string,
  until?: string,
  misc?: string,
  value: (number|array) // as mentioned above,
}
```

``` jsx static
<CardContent color={[
    { until: 'xl', value: [ 4, 2, ] },
    { from: 'xl', value: 4 },
  ]}
/>
```


### **Seperator**

A `<CardContent />` component can be assigned a visual separator on its to
using the `seperator` prop, which can either be a `boolean` - in which case
the default color, width and style assigned in the theme will be used -
or an object with values overriding the theme's default:

```ts static
// If a key is not present in the object, the theme's default will be used
// as its substitute
{
  // A named color, or a named color and a variant
  color?: string | [ string, ] | [ string, string ],
  // The border style to use
  style?: 'dashed'
    | 'dotted'
    | 'double'
    | 'groove'
    | 'hidden'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'none'
    | 'outset'
    | 'ridge'
    | 'solid'
    | 'unset',
  // The seperator's width, in pixels
  width?: number,
}
```


### **Custom Styling**

Miscellaneous CSS can be applied to a button using the `miscStyles` prop.

```jsx static
<CardContent miscStyles={{ textAlign: 'center' }} />
```

Miscellaneous styles can be set differently for different breakpoints

```jsx static
<CardContent miscStyles={{
  textAlign: [
    { until: 'xl', value: 'right' },
    { from: 'xl', value: 'center' },
  ],
}} />
```



### **Miscellaneous DOM Attributes**

Additional attributes can be set on the DOM element using the `attrs` prop

```jsx static
<CardContent
  attrs={{
    'aria-label': 'A button with custom attributes',
    'aria-describedby': 'someDomElement',
  }}
/>
```

