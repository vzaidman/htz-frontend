`<CardFooter />` is part of the internal API of a `<Card />` component,
very similar to the `<CardContent />` component, with the sole difference 
that it will, by default, be pushed all the way to the bottom of the card:

```jsx static
<Card>
  <CardContent>Card content goes here</CardContent>
  <CardFooter>Footer at bottom</CardContent>
</Card>
```

```jsx
const TextPlaceholder = ({ width, height = '6rem', marginBottom='2rem', }) => (
  <div style={{ width, height, backgroundColor: '#ddd', marginBottom, }} />
);

<div style={{ padding: '4rem', backgroundColor: '#eee', }} dir="rtl">
  <Grid>
    <GridItem width={1 / 2}>
      <Card 
        tagName="article"
        miscStyles={{ height: '100%', }} 
        attrs={{ dir: 'ltr', }}
      >
        <CardContent padding={4}>
          <TextPlaceholder width="80%" />
          <TextPlaceholder width="60%" marginBottom="4rem" />
          <TextPlaceholder width="90%" height="3rem" />
          <TextPlaceholder width="95%" height="3rem" />
          <TextPlaceholder width="85%" height="3rem" />
        </CardContent>
        <CardFooter
          padding={[ 2, 4, ]}
          tagName="footer"
          seperator
        >
          The footer is automatically pushed to the bottom
        </CardFooter>
      </Card>
    </GridItem>
    <GridItem width={1 / 2}>
      <Card 
        tagName="article"
        miscStyles={{ height: '100%', }} 
        attrs={{ dir: 'ltr', }}
      >
        <CardContent padding={4}>
          <TextPlaceholder width="80%" />
          <TextPlaceholder width="60%" marginBottom="4rem" />
          <TextPlaceholder width="85%" height="3rem" />
          <TextPlaceholder width="65%" height="3rem" />
        </CardContent>
        <CardFooter
          padding={[ 2, 4, ]}
          tagName="footer"
          seperator
        >
          The footer is automatically pushed to the bottom
        </CardFooter>
      </Card>
    </GridItem>
  </Grid>
</div>
```


### **Underlying Element**

By default, a `<CardFooter />` component will be rendered as a 'div'. 
However, being such a generic UI component, it would only make sense that 
different use case require the need for different HTML semantics, ofter a 
`footer` element.

This can be done using the `tagName` prop:

```jsx static
<CardFooter tagName="footer" />
```


### **Background Color**

The background color of a `<CardFooter />` component is not set by default,
but can be set using the `backgroundColor` prop, which can be:

  - A `string` representing a named color.
  - A `tuple` of two `string`s, the first representing.
    a named color, and the second representing a variant
    of that named color.

```jsx static
  <CardFooter backgroundColor={['neutral', '-2']} />
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
<CardFooter backgroundColor={[
    { until: 'xl', value: [ 'neutral', '-1' ] },
    { from: 'xl', value: 'secondary' },
  ]}
/>
```


### **Color**

The color of a `<CardFooter />` component is not set by default,
but can be set using the `color` prop, which can be:

  - A `string` representing a named color.
  - A `tuple` of two `string`s, the first representing.
    a named color, and the second representing a variant
    of that named color.

```jsx static
  <CardFooter color={['neutral', '-2']} />
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
<CardFooter color={[
    { until: 'xl', value: [ 'neutral', '-1' ] },
    { from: 'xl', value: 'secondary' },
  ]}
/>
```


### **Padding**

The default padding of a `<CardFooter />` component as set in the theme
but can be changed using the `padding` prop, which can be:

  - A `number` representing `rem` values.
  - An `array` of between 1 to 4 `number`s, representing padding values in rem
    in the following order: `padding-top`, `padding-inline-start`, `padding-bottom`, 
    `padding-inline-end`.

```jsx static
<CardFooter padding="2" /> // 2 rems of padding all around

/* or */
<CardFooter padding={[2]} /> // 2 rems of padding all around

/* or */
<CardFooter padding={[2, 4]} /> // 2 rems of padding top & bottom, 
                                 // 4 from sides

/* or */
<CardFooter padding={[2, 4, 4]} /> // 2 rems of padding top 
                                    // 4 from sides
                                    // 4 from bottom

/* or */
<CardFooter padding={[2, 4, 4, 2]} /> // 2 rems of padding top 
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
<CardFooter color={[
    { until: 'xl', value: [ 4, 2, ] },
    { from: 'xl', value: 4 },
  ]}
/>
```


### **Seperator**

A `<CardFooter />` component can be assigned a visual separator on its to
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
<CardFooter miscStyles={{ textAlign: 'center' }} />
```

Miscellaneous styles can be set differently for different breakpoints

```jsx static
<CardFooter miscStyles={{
  textAlign: [
    { until: 'xl', value: 'right' },
    { from: 'xl', value: 'center' },
  ],
}} />
```



### **Miscellaneous DOM Attributes**

Additional attributes can be set on the DOM element using the `attrs` prop

```jsx static
<CardFooter
  attrs={{
    'aria-label': 'A button with custom attributes',
    'aria-describedby': 'someDomElement',
  }}
/>
```

