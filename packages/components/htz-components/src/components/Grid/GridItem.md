`<GridItem />`s may only be placed as the direct descendants of a grid container.

Each `<GridItem>` has padding the length of half a single gutter at its left and 
right edges, creating a gap between the different items. The gutter's width is 
modified on the grid level, not that on the individual `<GridItem>`

`<GridItem>`s are set to box-sizing: border-box, so that the padding used to 
form gutters is taken into consideration when setting item widths.

#### **Basic Usage**

A `<gridItem>`'s width is set using the `width` prop, which takes a number.

When `width` is greater than `0` and less then or equal to `1`, it represents
(`width of item` / 'columns in grid row'), and, for readability,
should also be passed this way, e.g., `width={3 / 4}`. 

`width` can be set responsively (see example below).

```jsx
const fpo = {
  backgroundColor: '#0B7EB5',
  color: '#fff',
  height: '4rem',
  marginBottom: '2rem',
  padding: '1rem',
  width: '100%',
};

<Grid>
  <GridItem width={1/1}><div style={fpo} /></GridItem>
  <GridItem width={1/12}><div style={fpo} /></GridItem>
  <GridItem width={11/12}><div style={fpo} /></GridItem>
  <GridItem width={2/12}><div style={fpo} /></GridItem>
  <GridItem width={10/12}><div style={fpo} /></GridItem>
  <GridItem width={3/12}><div style={fpo} /></GridItem>
  <GridItem width={9/12}><div style={fpo} /></GridItem>
  <GridItem width={4/12}><div style={fpo} /></GridItem>
  <GridItem width={8/12}><div style={fpo} /></GridItem>
  <GridItem width={5/12}><div style={fpo} /></GridItem>
  <GridItem width={7/12}><div style={fpo} /></GridItem>
  <GridItem width={6/12}><div style={fpo} /></GridItem>
  <GridItem width={6/12}><div style={fpo} /></GridItem>

  <GridItem width={7/12}><div style={fpo} /></GridItem>
  <GridItem width={5/12}><div style={fpo} /></GridItem>
  <GridItem width={8/12}><div style={fpo} /></GridItem>
  <GridItem width={4/12}><div style={fpo} /></GridItem>
  <GridItem width={9/12}><div style={fpo} /></GridItem>
  <GridItem width={3/12}><div style={fpo} /></GridItem>
  <GridItem width={10/12}><div style={fpo} /></GridItem>
  <GridItem width={2/12}><div style={fpo} /></GridItem>
  <GridItem width={11/12}><div style={fpo} /></GridItem>
  <GridItem width={1/12}><div style={fpo} /></GridItem>
  <GridItem width={1/1}><div style={fpo} /></GridItem>
</Grid>
```

When `width` is a number greater than `1`, it will be used to set a fixed width
in `rem`s, thus supporting fixed-fluid layouts.

`<GridItem>`s lacking the `width` prop will be equally distributed in the
remaining space.

```jsx
const fpo = {
  backgroundColor: '#0B7EB5',
  color: '#fff',
  marginBottom: '2rem',
  padding: '1rem',
  textAlign: 'center',
  width: '100%',
};

<Grid>
  <GridItem width={40}><div style={fpo}>fixed to 40rem</div></GridItem>
  <GridItem><div style={fpo}>distributed in remaining space</div></GridItem>
  <GridItem><div style={fpo}>distributed in remaining space</div></GridItem>
</Grid>
```


<a name="responsiveWidth"> </a>

As previously mentioned, A `<GridItem />`'s width, may be set 
responsively by passing an array of objects specifying meqia-query 
conditions (`from`, `until`, `misc`, `type`) and a `value`, e.g.:

``` jsx static
<GridItem
   width={[ { until: 'xl', value: 2 / 4, }, { from: 'xl', value: 1 / 1, }, ]}
 > 
   ...
 </GridItem>
```

The following example breaks into two rows in viewports smaller than the `xl` 
breakpoint

```jsx
const fpo = {
  backgroundColor: '#0B7EB5',
  color: '#fff',
  height: '8rem',
  marginBottom: '4rem',
  width: '100%',
};

<Grid>
  <GridItem width={[ { until: 'xl', value: 1 / 2, }, { from: 'xl', value: 1 / 4, }, ]} >
    <div style={fpo} />
  </GridItem>
  <GridItem width={[ { until: 'xl', value: 1 / 2, }, { from: 'xl', value: 3 / 4, }, ]} >
    <div style={fpo} />
  </GridItem>
  <GridItem width={[ { until: 'xl', value: 1 / 2, }, { from: 'xl', value: 3 / 4, }, ]} >
    <div style={fpo} />
  </GridItem>
  <GridItem width={[ { until: 'xl', value: 1 / 2, }, { from: 'xl', value: 1 / 4, }, ]}>
    <div style={fpo} />
  </GridItem>
</Grid>
```

#### **Offset**

`<GridItem>`s may be pushed away from their `<Grid>`'s start by using the `offset`
prop, which work in a similar manner to the `width` prop, taking the same 
argument structure, but sets a margin to push the `<GridItem>` away instead of 
setting its width. E.g. `offset={2 / 8}` will offset the `<GridItem>` away from
it natural position by 25% of the `<Grid>`'s width (equal to two of eight 
columns).

A `<gridItem>`'s offset can be set responsively by passing an array of 
objects specifying meqia-query conditions (`from`, `until`, `misc`, `type`) 
and a `value`. See <code>[width](#responsiveWidth)</code> for a code
example.

```jsx
const fpo = {
  backgroundColor: '#0B7EB5',
  color: '#fff',
  height: '4rem',
  marginBottom: '2rem',
  padding: '1rem',
  width: '100%',
};

<Grid attrs={{ dir: 'rtl' }}>
  <GridItem offset={5/6} width={1/6}><div style={fpo} /></GridItem>
  <GridItem width={1/1} />
  <GridItem offset={4/6} width={1/6}><div style={fpo} /></GridItem>
  <GridItem width={1/1} />
  <GridItem offset={3/6} width={1/6}><div style={fpo} /></GridItem>
  <GridItem width={1/1} />
  <GridItem offset={2/6} width={1/6}><div style={fpo} /></GridItem>
  <GridItem width={1/1} />
  <GridItem offset={1/6} width={1/6}><div style={fpo} /></GridItem>
  <GridItem width={1/1} />
  <GridItem width={1/6}><div style={fpo} /></GridItem>
</Grid>
```


#### **Rule**

Using the `rule` prop, `<GridItem>`s may be appended a gutter-rule of varying 
width and color to visually separate them from the following `<GridItem>`.

The prop takes either a `boolean`, in which case the default rule settings
set in the theme will be used, or an object with two keys: 

* `color` (`string`|`string[]`), which should point to a named color from the 
theme
* `width` (`number`), which determines the rule's width in _pixels_

A `<gridItem>`'s `rule` can be set responsively by passing an array of 
objects specifying meqia-query conditions (`from`, `until`, `misc`, `type`) 
and a `value` (`boolean`|`Object`), e.g.:
``` js static
rule={[ { from: 'xl', value: true }, ]}
// or
rule={[ { from: 'xl', value: { color: [ 'neutral', '-3', ], width: 3, }, }, ]}
```

See <code>[width](#responsiveWidth)</code> for a live example of using 
responsive values.

<small><em>(The grid below is in "rtl")</em></small>

```jsx
const fpo = {
  backgroundColor: '#0B7EB5',
  color: '#fff',
  padding: '1rem',
  textAlign: 'center',
  width: '100%',
};

<Grid attrs={{ dir: 'rtl' }}>
  <GridItem width={1/6}><div style={fpo}>No rule</div></GridItem>
  <GridItem width={1/6}><div style={fpo}>No rule</div></GridItem>
  <GridItem width={2/6} rule><div style={fpo}>Has rule</div></GridItem>
  <GridItem width={1/6}><div style={fpo}>No rule</div></GridItem>
  <GridItem width={1/6}><div style={fpo}>No rule</div></GridItem>
</Grid>
```

#### Stretching Content to Fill Heigh

The `strethContent` prop forces the `<GridItem>` to stretch its content to fill
its own height, which in the default case, where the `<Grid>`'s `vAlign` prop is
unset (hence implicitly set to `stretch`), would mean the height of the tallest
`<GridItem>` in the same line of the `<Grid>`.

```jsx
const TextPlaceholder = ({ width, height = '6rem', marginBottom='2rem', }) => (
  <div style={{ width, height, backgroundColor: '#ddd', marginBottom, }} />
);

<div style={{ padding: '4rem', backgroundColor: '#eee', }}>
  <p style={{ marginBottom: '2rem', marginTop: '-2rem', }}>The content is stretched to the height of the Image: </p>
  <Card fillHeight>
    <Grid gutter={0}>
      <GridItem width={1/3} stretchContent>
        <img style={{maxWidth: '100%'}} src="https://source.unsplash.com/ZiJ9QGRCVEg/600x400" />
      </GridItem>
      <GridItem stretchContent>
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
          <TextPlaceholder width="45%" height="3rem" marginBottom="0" />
        </CardFooter>
      </GridItem>
    </Grid>
  </Card>
</div>
```


See <code>[width](#responsiveWidth)</code> for a live example of using 
responsive values.


#### **DOM Element Attributes**

The `attrs` prop take an object which is spread on the DOM element, and can
be used to add additional attributes to the DOM element, e.g.:

```jsx static
<GridItem attrs={{ 'aria-hidden': true, tabIndex: -1, }}> ... </GridItem>
```


```jsx
const fpo = {
  backgroundColor: '#0B7EB5',
  color: '#fff',
  height: '4rem',
  marginBottom: '2rem',
  padding: '1rem',
  width: '100%',
};

<Grid>
  <GridItem width={1/2} attrs={{ 'aria-hidden': true, tabIndex: -1, }}><div style={fpo} /></GridItem>
  <GridItem width={1/2}><div style={fpo} /></GridItem>
</Grid>
```

#### **Custom Tag**

By default, a `<GridItem />` is rendered as a div, but you are free to render is as whatever tag 
you'd like to fit the semantics of your use-case by passing a `string` to the `tagName` prop,
e.g.:

```jsx static
<GridItem tagName="section"> ... </GridItem>
```

```jsx
const fpo = {
  backgroundColor: '#0B7EB5',
  color: '#fff',
  height: '4rem',
  marginBottom: '2rem',
  padding: '1rem',
  width: '100%',
};

<Grid>
  <GridItem width={1/2} tagName="section"><div style={fpo} /></GridItem>
  <GridItem width={1/2} tagName="section"><div style={fpo} /></GridItem>
</Grid>
```
