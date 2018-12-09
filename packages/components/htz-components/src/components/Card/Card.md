A card is a ui container designed to hold content about a single issue, 
contained within clear visual boundaries.

`<CardContent />` and `<CardFooter />` are complimentary components which are
part of its internal API used to position content and allow for easy semantic
division within the card.

```jsx
const IconTwitter = require('../Icon/icons/IconTwitter').default;
const IconFacebook = require('../Icon/icons/IconFacebookLogo').default;
const TextPlaceholder = ({ width, height = '6rem', marginBottom='2rem', }) => (
  <div style={{ width, height, backgroundColor: '#ddd', marginBottom, }} />
);

<div style={{ padding: '4rem', backgroundColor: '#eee', }} dir="rtl">
  <Grid>
    <GridItem miscStyles={{
        display: [ { until: 'l', value: 'none', }, ]
      }}
    >
      <Card miscStyles={{ height: '100%', }} attrs={{ dir: 'ltr', }}>
        <CardContent padding={4}>
          <TextPlaceholder width="80%" />
          <TextPlaceholder width="90%" />
          <TextPlaceholder width="60%" marginBottom="4rem" />
          <TextPlaceholder width="90%" height="3rem" />
          <TextPlaceholder width="95%" height="3rem" />
          <TextPlaceholder width="85%" height="3rem" />
          <TextPlaceholder width="65%" height="3rem" />
        </CardContent>
        <CardFooter
          padding={[ 2, 4, ]}
          tagName="footer"
          seperator
        >
          <TextPlaceholder width="45%" height="3rem" marginBottom="0" />
        </CardFooter>
      </Card>
    </GridItem>
    <GridItem 
      width={[
        { from: 's', until: 'l', value: 3/4, },
        { from: 'l', until: 'xl', value: 1/2 },
        { from: 'xl', value: 1/3 },
      ]} 
      offset={[ { from: 's', until: 'l', value: 1/8, }, ]} 
    >
      <Card isElevated attrs={{ dir: 'ltr' }} tagName="article">
        <img style={{maxWidth: '100%'}} src="https://source.unsplash.com/ZiJ9QGRCVEg/600x400" />
        <CardContent color={[ 'primary', '+1', ]} miscStyles={{ marginBottom: '3rem', }}>
          <h3 style={{
            fontWeight: 700,
            fontSize: '24px',
            lineHeight: '4rem',
            marginBottom: '1rem',
          }} >
            The Night's Sky
          </h3>
          <p style={{ color: '#222', fontWeight: 700, }}>
            The term night sky refers to the nighttime appearance of celestial objects like stars, planets, and the Moon.
          </p>
        </CardContent>
        <CardFooter
          tagName="footer"
          color='primary'
          seperator
          miscStyles={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <a href="/!#/Card" style={{ 
            fontSize: '14px', 
            lineHeight: '3rem', 
            fontWeight: 700, 
            marginRight: 'auto',
          }}>
            READ MORE
          </a>
          <IconTwitter
            miscStyles={{
              margin: '0 1rem',
              color: '#bbb',
              cursor: 'pointer',
              ':hover': { color: 'inherit', }, 
            }}
          />
          <IconFacebook
            miscStyles={{
              margin: '0 1rem',
              color: '#bbb',
              cursor: 'pointer',
              ':hover': { color: 'inherit', }, 
            }}
          />
        </CardFooter>
      </Card>
    </GridItem>
  </Grid>
</div>
```

### **Underlying Element**

By default, a `<Card />` will be rendered as a 'div'. However, being such
a generic UI component, it would only make sense that different use case
will require the need for different HTML semantics. For instance, would
quite frequently make sense to use an `article` element for a card.

This can be done using the `tagName` prop:

```jsx static
<Card tagName="article" />
```


### **Background Color**

The default background color defined in the theme can be overridden using the
`backgroundColor` prop, which can be:

  - A `string` representing a named color.
  - A `tuple` of two `string`s, the first representing.
    a named color, and the second representing a variant
    of that named color.

```jsx static
  <Card backgroundColor={['neutral', '-2']} />
```

```jsx
<div style={{ padding: '4rem', backgroundColor: '#eee', }}>
  <Card backgroundColor={['neutral', '-2']}>
    <CardContent color="white">
      A card with altered background color
    </CardContent>
  </Card>
</div>
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
<Card backgroundColor={[
    { until: 'xl', value: [ 'neutral', '-1' ] },
    { from: 'xl', value: 'secondary' },
  ]}
/>
```

```jsx
<div style={{ padding: '4rem', backgroundColor: '#eee', }}>
  <Card
    backgroundColor={[
        { until: 'xl', value: [ 'neutral', '-1' ] },
        { from: 'xl', value: 'secondary' },
      ]}
  >
    <CardContent color="white">
      A card with different backgrounds in different breakpoints
    </CardContent>
  </Card>
</div>
```


### Box Shadow and Elevation

The theme contains two box-shadow definitions, for a regular card and an
elevated one. To indicate a card is elevated, simply provide an `isElevated`
prop
```jsx static
  <Card isElevated />
```

```jsx
<div style={{ padding: '4rem', backgroundColor: '#eee', }}>
  <Card isElevated>
    <CardContent>
      An elevated card
    </CardContent>
  </Card>
</div>
```

### Filling Container Height

In lists, it is often desirable to have cards fill their parent's height, so they
are in line with other elements in a grid, which can be done by setting the 
`fillHeight` prop to `true`.

```jsx
const TextPlaceholder = ({ width, height = '6rem', marginBottom='2rem', }) => 
  (<div style={{ width, height, backgroundColor: '#ddd', marginBottom, }} />);

<div style={{ padding: '2rem', backgroundColor: '#eee', }}>
  <Grid>
    <GridItem width={1/3}>
      <Card fillHeight>
        <CardContent padding={4}>
          <TextPlaceholder width="80%" />
          <TextPlaceholder width="90%" />
          <TextPlaceholder width="60%" marginBottom="4rem" />
          <TextPlaceholder width="90%" height="3rem" />
          <TextPlaceholder width="95%" height="3rem" />
          <TextPlaceholder width="85%" height="3rem" />
          <TextPlaceholder width="65%" height="3rem" />
        </CardContent>
        <CardFooter
          padding={[ 2, 4, ]}
          tagName="footer"
          seperator
        >
          <TextPlaceholder width="45%" height="3rem" marginBottom="0" />
        </CardFooter>
      </Card>
    </GridItem>

    <GridItem width={1/3}>
      <Card fillHeight>
        <CardContent padding={4}>
          <TextPlaceholder width="80%" />
          <TextPlaceholder width="60%" marginBottom="4rem" />
          <TextPlaceholder width="90%" height="3rem" />
          <TextPlaceholder width="65%" height="3rem" />
        </CardContent>
        <CardFooter
          padding={[ 2, 4, ]}
          tagName="footer"
          seperator
        >
          <TextPlaceholder width="45%" height="3rem" marginBottom="0" />
        </CardFooter>
      </Card>
    </GridItem>

    <GridItem width={1/3}>
      <Card fillHeight>
        <CardContent padding={4}>
          <TextPlaceholder width="80%" />
          <TextPlaceholder width="90%" />
          <TextPlaceholder width="70%" />
          <TextPlaceholder width="60%" marginBottom="4rem" />
          <TextPlaceholder width="90%" height="3rem" />
          <TextPlaceholder width="95%" height="3rem" />
          <TextPlaceholder width="95%" height="3rem" />
          <TextPlaceholder width="85%" height="3rem" />
          <TextPlaceholder width="65%" height="3rem" />
        </CardContent>
        <CardFooter
          padding={[ 2, 4, ]}
          tagName="footer"
          seperator
        >
          <TextPlaceholder width="45%" height="3rem" marginBottom="0" />
        </CardFooter>
      </Card>
    </GridItem>
  </Grid>
</div>
```

The `fillHeight` prop can be be set to different values for different breakpoints
by providing an array of objects representing media queries, in the following 
structure:

```ts static
{
  from?: string,
  until?: string,
  misc?: string,
  value: boolean // as mentioned above,
}
```

``` jsx static
<Card fillHeight={[
    { until: 'xl', value: true },
    { from: 'xl', value: false },
  ]}
/>
```

### **Custom Styling**

Miscellaneous CSS can be applied to a Card using the `miscStyles` prop.

```jsx static
<Card miscStyles={{ textAlign: 'center' }} />
```

```jsx
<div style={{ padding: '4rem', backgroundColor: '#eee', }}>
  <Card miscStyles={{ textAlign: 'center' }}>
    <CardContent>
      this card's content is:
      <br />
      centered
    </CardContent>
  </Card>
</div>
```

Miscellaneous styles can be set differently for different breakpoints

```jsx static
<Card miscStyles={{
  textAlign: [
    { until: 'xl', value: 'right' },
    { from: 'xl', value: 'center' },
  ],
}} />
```

```jsx
<div style={{ padding: '4rem', backgroundColor: '#eee', }}>
  <Card
    miscStyles={{
      textAlign: [
        { until: 'xl', value: 'right' },
        { from: 'xl', value: 'center' },
      ],
  }}>
    <CardContent>
      this card's content is:
      <br />
      aligned to the right until xl breakpoint and then centerd
    </CardContent>
  </Card>
</div>
```


### **Miscellaneous DOM Attributes**

Additional attributes can be set on the DOM element using the `attrs` prop

```jsx static
<Card
  attrs={{
    'aria-label': 'A card with custom attributes',
    'aria-describedby': 'someDomElement',
  }}
/>
```

