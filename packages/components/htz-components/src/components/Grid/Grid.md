`<Grid>` is a responsive, flexbox-based grid system, intended to be both 
flexible and easy to use.

### Features

* Responsive
* Column wrapping
* Infinitely nestable
* Custom horizontal alignment of items
* Custom vertical alignment of items
* Configurable gutter width


#### **Basic use**

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
  <GridItem width={1/3}><div style={fpo} /></GridItem>
  <GridItem width={2/3}><div style={fpo} /></GridItem>
  <GridItem width={2/3}><div style={fpo} /></GridItem>
  <GridItem width={1/3}><div style={fpo} /></GridItem>
</Grid>
```

#### **DOM Element Attributes**

The `attrs` prop take an object which is spread on the DOM element, and can
be used to add additional attributes to the DOM element, e.g.:

```jsx static
<Grid attrs={{ 'aria-hidden': true, tabIndex: -1, }}> ... </Grid>
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

<Grid attrs={{ 'aria-hidden': true, tabIndex: -1, }}>
  <GridItem width={1/3}><div style={fpo} /></GridItem>
  <GridItem width={2/3}><div style={fpo} /></GridItem>
  <GridItem width={2/3}><div style={fpo} /></GridItem>
  <GridItem width={1/3}><div style={fpo} /></GridItem>
</Grid>
```

#### **Custom Tag**

By default, a `<Grid />` is rendered as a div, but you are free to render is as whatever tag 
you'd like to fit the semantics of your use-case by passing a `string` to the `tagName` prop,
e.g.:

```jsx static
<Grid tagName="section"> ... </Grid>
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

<Grid tagName="section">
  <GridItem width={1/3}><div style={fpo} /></GridItem>
  <GridItem width={2/3}><div style={fpo} /></GridItem>
  <GridItem width={2/3}><div style={fpo} /></GridItem>
  <GridItem width={1/3}><div style={fpo} /></GridItem>
</Grid>
```

#### **Gutter Width**

Gutter width can be xustomized using the `gutter` prop, which sets the 
gutter between `<GridItem>`s in rhythm units.

```jsx
const fpo = {
  backgroundColor: '#0B7EB5',
  color: '#fff',
  height: '4rem',
  marginBottom: '2rem',
  padding: '1rem',
  width: '100%',
};

<Grid gutter={2}>
  <GridItem width={1/1}><div style={fpo} /></GridItem>
  <GridItem width={1/4}><div style={fpo} /></GridItem>
  <GridItem width={3/4}><div style={fpo} /></GridItem>
  <GridItem width={1/2}><div style={fpo} /></GridItem>
  <GridItem width={1/2}><div style={fpo} /></GridItem>
  <GridItem width={3/4}><div style={fpo} /></GridItem>
  <GridItem width={1/4}><div style={fpo} /></GridItem>
  <GridItem width={1/1}><div style={fpo} /></GridItem>
</Grid>
```

Gutter widths can also be set on a per breakpoint basis by passing an 
object with an `onServerRender` key (`number`), for setting the default 
gutter on server render, and a `queries` key, which should be an array of 
objects specifying meqia-query conditions (`from`, `until`, 
`misc`, `type`) and a `value`. e.g.:

``` jsx static
<Grid gutter={{ 
   onServerRender: 2, 
   queries: [ { until: 'xl', value: 2, }, { from: 'xl', value: 4, }, ], }}
 > ... </Grid>
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

<Grid gutter={{ 
  onServerRender: 2, 
  queries: [ { until: 'xl', value: 2, }, { from: 'xl', value: 4, }, ], }}
>
  <GridItem width={1/1}><div style={fpo} /></GridItem>
  <GridItem width={1/4}><div style={fpo} /></GridItem>
  <GridItem width={3/4}><div style={fpo} /></GridItem>
  <GridItem width={1/2}><div style={fpo} /></GridItem>
  <GridItem width={1/2}><div style={fpo} /></GridItem>
  <GridItem width={3/4}><div style={fpo} /></GridItem>
  <GridItem width={1/4}><div style={fpo} /></GridItem>
  <GridItem width={1/1}><div style={fpo} /></GridItem>
</Grid>
```

#### **Reversed Grid**

`<Grid />`s may render their items in reverse by setting the `isRevProp`:


```jsx
const fpo = {
  backgroundColor: '#0B7EB5',
  color: '#fff',
  marginBottom: '2rem',
  padding: '1rem',
  textAlign: 'center',
  width: '100%',
};

<div style={{ direction: 'ltr', }}>
<p style={{ marginBottom: '1rem', textAlign: 'center', }}><small><strong>
The <code>{'<Grid />'}</code> below is rendered in an `ltr` context, but cells are drawn in reverse order
</strong></small></p>

<Grid isRev>
  <GridItem width={1/3}><div style={fpo}>1</div></GridItem>
  <GridItem width={2/3}><div style={fpo}>2</div></GridItem>
  <GridItem width={2/3}><div style={fpo}>3</div></GridItem>
  <GridItem width={1/3}><div style={fpo}>4</div></GridItem>
</Grid>
</div>
```

<a name="responsiveIsRev"> </a>

A `<Grid />`s direction, may also be set responsively by passing an array of 
objects specifying meqia-query conditions (`from`, `until`, `misc`, `type`) and a 
`value`, e.g.:

``` jsx static
<Grid 
   gutter={[ { until: 'xl', value: false, }, { from: 'xl', value: true, }, ]}
 > 
   ...
 </Grid>
```


```jsx
const fpo = {
  backgroundColor: '#0B7EB5',
  color: '#fff',
  marginBottom: '2rem',
  padding: '1rem',
  textAlign: 'center',
  width: '100%',
};

<div style={{ direction: 'ltr', }}>
<p style={{ marginBottom: '1rem', textAlign: 'center', }}><small><strong>
The <code>{'<Grid />'}</code> below is reversed only from the `xl` breakpoint
</strong></small></p>

<Grid isRev={[ { from: 'xl', value: true, }, ]}>
  <GridItem width={1/3}><div style={fpo}>1</div></GridItem>
  <GridItem width={2/3}><div style={fpo}>2</div></GridItem>
  <GridItem width={2/3}><div style={fpo}>3</div></GridItem>
  <GridItem width={1/3}><div style={fpo}>4</div></GridItem>
</Grid>
</div>
```

#### **Row Spacing**

The margin between rows in the `<Grid>` can be set by adding `margin-top` to
each `<GridItem>`, except those occupying the first row.

The `rowSpacing` prop, takes an object with `amount` and `nUp` keys:

* `amount` (`number`): The margin, in rems, between `<Grid>` rows
* `nUp` (`number`): The number of items in the *first* row of the grid, which 
  should not have `margin-top` applied to them.

Row spacing can be set responsively by passing an array of objects
each specifying meqia-query conditions (`from`, `until`, `misc`, `type`) and a 
`value` with the above object:

```js static
// 2 rems of spacing between rows, 3 `<GridItems>` in the first row
rowSpacing={{ amount: 2, nUp: 3 }}

// Or

// 2 rems of spacing between rows, 
// 2 `<GridItems>` in the first row until `xl` breakpoint
// 3 `<GridItems>` in the first row from `xl` breakpoint
rowSpacing={[
  { until: 'xl': value: { amount: 2, nUp: 2 }, },
  { from: 'xl': value: { amount: 2, nUp: 3 }, },
]}
```

```jsx
const fpo = {
  backgroundColor: '#0B7EB5',
  color: '#fff',
  height: '4rem',
  textAlign: 'center',
  width: '100%',
};

<Grid rowSpacing={{ amount: 2, nUp: 2, }}>
  <GridItem width={1/2}><div style={fpo}/></GridItem>
  <GridItem width={1/2}><div style={fpo}/></GridItem>
  <GridItem width={1/3}><div style={fpo}/></GridItem>
  <GridItem width={1/3}><div style={fpo}/></GridItem>
  <GridItem width={1/3}><div style={fpo}/></GridItem>
  <GridItem width={1/2}><div style={fpo}/></GridItem>
  <GridItem width={1/2}><div style={fpo}/></GridItem>
</Grid>
```

See <code>[reversed grid](#responsiveIsRev)</code> for a live example of 
setting responsive values on a prop.


#### **Horizontal Alignment**

The horizontal alignment of `<GridItem>`s within the `<Grid>` may be 
set to `start`, `center`, `end`, `space-around` or `space-between`
using the `align` prop.

Alignment can be set responsively by passing an array of objects
specifying meqia-query conditions (`from`, `until`, `misc`, `type`) and a 
`value`. See <code>[reversed grid](#responsiveIsRev)</code> for a code example

`align="start"`:
Align grid items to the horizontal start of the grid container

```jsx
const fpo = {
  backgroundColor: '#0B7EB5',
  color: '#fff',
  marginBottom: '2rem',
  padding: '1rem',
  textAlign: 'center',
  width: '100%',
};

<Grid align='start'>
  <GridItem width={1/4}><div style={fpo}>1 of 4</div></GridItem>
  <GridItem width={1/4}><div style={fpo}>1 of 4</div></GridItem>
  <GridItem width={2/3}><div style={fpo}>2 of 3</div></GridItem>
  <GridItem width={5/6}><div style={fpo}>5 of 6</div></GridItem>
  <GridItem width={1/1}><div style={fpo}>1 of 1</div></GridItem>
</Grid>
```

`align="end"`:
Align grid items to the horizontal end of the grid container

```jsx
const fpo = {
  backgroundColor: '#0B7EB5',
  color: '#fff',
  marginBottom: '2rem',
  padding: '1rem',
  textAlign: 'center',
  width: '100%',
};

<Grid align='end'>
  <GridItem width={1/4}><div style={fpo}>1 of 4</div></GridItem>
  <GridItem width={1/4}><div style={fpo}>1 of 4</div></GridItem>
  <GridItem width={2/3}><div style={fpo}>2 of 3</div></GridItem>
  <GridItem width={5/6}><div style={fpo}>5 of 6</div></GridItem>
  <GridItem width={1/1}><div style={fpo}>1 of 1</div></GridItem>
</Grid>
```

`align="center"`:
Align grid items to the horizontal center of the grid container

```jsx
const fpo = {
  backgroundColor: '#0B7EB5',
  color: '#fff',
  marginBottom: '2rem',
  padding: '1rem',
  textAlign: 'center',
  width: '100%',
};

<Grid align='center'>
  <GridItem width={1/4}><div style={fpo}>1 of 4</div></GridItem>
  <GridItem width={1/4}><div style={fpo}>1 of 4</div></GridItem>
  <GridItem width={2/3}><div style={fpo}>2 of 3</div></GridItem>
  <GridItem width={5/6}><div style={fpo}>5 of 6</div></GridItem>
  <GridItem width={1/1}><div style={fpo}>1 of 1</div></GridItem>
</Grid>
```

`align="space-between"`:
Distribute gird items evenly with the first item flush with the start, and 
the last is flush with the end

```jsx
const fpo = {
  backgroundColor: '#0B7EB5',
  color: '#fff',
  marginBottom: '2rem',
  padding: '1rem',
  textAlign: 'center',
  width: '100%',
};

<Grid align='space-between'>
  <GridItem width={1/4}><div style={fpo}>1 of 4</div></GridItem>
  <GridItem width={1/4}><div style={fpo}>1 of 4</div></GridItem>
  <GridItem width={1/4}><div style={fpo}>1 of 4</div></GridItem>
  <GridItem width={1/3}><div style={fpo}>1 of 3</div></GridItem>
  <GridItem width={1/3}><div style={fpo}>1 of 3</div></GridItem>
  <GridItem width={3/7}><div style={fpo}>3 of 7</div></GridItem>
  <GridItem width={3/7}><div style={fpo}>3 of 7</div></GridItem>
  <GridItem width={2/8}><div style={fpo}>2 of 8</div></GridItem>
  <GridItem width={5/8}><div style={fpo}>5 of 8</div></GridItem>
</Grid>
```

`align="space-around"`:
Center and distribute gird items evenly with spacing equal spacing on both side
of grid items

```jsx
const fpo = {
  backgroundColor: '#0B7EB5',
  color: '#fff',
  marginBottom: '2rem',
  padding: '1rem',
  textAlign: 'center',
  width: '100%',
};

<Grid align='space-around'>
  <GridItem width={1/4}><div style={fpo}>1 of 4</div></GridItem>
  <GridItem width={1/4}><div style={fpo}>1 of 4</div></GridItem>
  <GridItem width={1/4}><div style={fpo}>1 of 4</div></GridItem>
  <GridItem width={1/3}><div style={fpo}>1 of 3</div></GridItem>
  <GridItem width={1/3}><div style={fpo}>1 of 3</div></GridItem>
  <GridItem width={3/7}><div style={fpo}>3 of 7</div></GridItem>
  <GridItem width={3/7}><div style={fpo}>3 of 7</div></GridItem>
  <GridItem width={2/8}><div style={fpo}>2 of 8</div></GridItem>
  <GridItem width={4/8}><div style={fpo}>4 of 8</div></GridItem>
</Grid>
```

#### **Vertical Alignment**

Control the vertical alignment `<GridItem>`s inside the `<Grid>` to one another

The vertical alignment of `<GridItem>`s within the smae row to one another
may be set to `start`, `middle` or `end` using the `vAlign` prop.

Vertical alignment can be set responsively by passing an array of objects
specifying meqia-query conditions (`from`, `until`, `misc`, `type`) and a 
`value`. See <code>[reversed grid](#responsiveIsRev)</code> for a code example
<br />

`vAlign="stretch"`:
Stretch all grid items to be the height of the tallest grid item within the same raw


```jsx
const fpo = {
  backgroundColor: '#0B7EB5',
  color: '#fff',
  marginBottom: '2rem',
  padding: '1rem',
  textAlign: 'center',
  width: '100%',
  width: '100%',
};

<Grid vAlign='stretch'>
  <GridItem width={1/4}><div style={{ ...fpo, height: '8rem' }}>1 of 4</div></GridItem>
  <GridItem width={1/4}><div style={{ ...fpo, height: '6rem' }}>1 of 4</div></GridItem>
  <GridItem width={1/4}><div style={{ ...fpo, height: '12rem' }}>1 of 4</div></GridItem>
  <GridItem width={1/3}><div style={{ ...fpo, height: '10rem' }}>1 of 3</div></GridItem>
  <GridItem width={1/3}><div style={{ ...fpo, height: '15rem' }}>1 of 3</div></GridItem>
</Grid>
```

`vAlign="top"`:
Vertically align grid items to each other's top

```jsx
const fpo = {
  backgroundColor: '#0B7EB5',
  color: '#fff',
  marginBottom: '2rem',
  padding: '1rem',
  textAlign: 'center',
  width: '100%',
};

<Grid vAlign='top'>
  <GridItem width={1/4}><div style={{ ...fpo, height: '8rem' }}>1 of 4</div></GridItem>
  <GridItem width={1/4}><div style={{ ...fpo, height: '6rem' }}>1 of 4</div></GridItem>
  <GridItem width={1/4}><div style={{ ...fpo, height: '12rem' }}>1 of 4</div></GridItem>
  <GridItem width={1/3}><div style={{ ...fpo, height: '10rem' }}>1 of 3</div></GridItem>
  <GridItem width={1/3}><div style={{ ...fpo, height: '15rem' }}>1 of 3</div></GridItem>
</Grid>
```

`vAlign="middle"`:
Vertically center-align grid items to each other

```jsx
const fpo = {
  backgroundColor: '#0B7EB5',
  color: '#fff',
  marginBottom: '2rem',
  padding: '1rem',
  textAlign: 'center',
  width: '100%',
};

<Grid vAlign='middle'>
  <GridItem width={1/4}><div style={{ ...fpo, height: '8rem' }}>1 of 4</div></GridItem>
  <GridItem width={1/4}><div style={{ ...fpo, height: '12rem' }}>1 of 4</div></GridItem>
  <GridItem width={1/4}><div style={{ ...fpo, height: '6rem' }}>1 of 4</div></GridItem>
  <GridItem width={1/3}><div style={{ ...fpo, height: '10rem' }}>1 of 3</div></GridItem>
  <GridItem width={1/3}><div style={{ ...fpo, height: '15rem' }}>1 of 3</div></GridItem>
</Grid>
```

`vAlign="bottom"`:
Vertically align grid items to each other's bottom

```jsx
const fpo = {
  backgroundColor: '#0B7EB5',
  color: '#fff',
  marginBottom: '2rem',
  padding: '1rem',
  textAlign: 'center',
  width: '100%',
};

<Grid vAlign='bottom'>
  <GridItem width={1/4}><div style={{ ...fpo, height: '8rem' }}>1 of 4</div></GridItem>
  <GridItem width={1/4}><div style={{ ...fpo, height: '12rem' }}>1 of 4</div></GridItem>
  <GridItem width={1/4}><div style={{ ...fpo, height: '6rem' }}>1 of 4</div></GridItem>
  <GridItem width={1/3}><div style={{ ...fpo, height: '10rem' }}>1 of 3</div></GridItem>
  <GridItem width={1/3}><div style={{ ...fpo, height: '15rem' }}>1 of 3</div></GridItem>
</Grid>
```

#### **Miscellaneous Styles**

Miscellaneous styles can be set using the `miscStyles` prop. 
The prop takes an object, where keys are (camelCased) css properties, and 
values are either strings or array of responsive objects specifying 
meqia-query conditions (`from`, `until`, `misc`, `type`) and a 
`value`, e.g.:

```jsx static
<Grid 
   miscStyles={ 
    color: [ { until: 's', value: 'red', }, {from: 's', value: 'green', }, ] 
    position: 'relative'
   }
 >
   ...
 </Grid>
}
```

Styles set by the `miscStyles` prop will trump all other styles.

```jsx
const fpo = {
  backgroundColor: '#0B7EB5',
  color: '#fff',
  height: '4rem',
  padding: '1rem',
  textAlign: 'center',
  width: '100%',
};

<Grid miscStyles={{ backgroundColor: '#ccc', marginStart: '0', marginEnd: '0', paddingTop: '2rem', paddingBottom: '2rem', }}>
  <GridItem width={1/8}><div style={fpo} /></GridItem>
  <GridItem width={2/8}><div style={fpo} /></GridItem>
  <GridItem width={4/8}><div style={fpo} /></GridItem>
  <GridItem width={1/8}><div style={fpo} /></GridItem>
</Grid>
```

#### **Nested Grids**

Grid can be Infinitely nested

```jsx
const fpo = {
  backgroundColor: '#0B7EB5',
  color: '#fff',
  height: '100%',
  padding: '4rem',
  textAlign: 'center',
  width: '100%',
};

<Grid>
  <GridItem width={1/4}><div style={{ ...fpo, height: '24rem' }}>1 of 4</div></GridItem>
  <GridItem width={3/4}>
    <div style={{ ...fpo, height: '24rem' }}>
      <Grid>
        <GridItem width={1/2}>
          <div style={{ ...fpo, backgroundColor: '#003D59', }}></div>
        </GridItem>
        <GridItem width={1/2}>
          <div style={{ ...fpo, backgroundColor: '#003D59', }}>
            <Grid>
            <GridItem width={1/2}>
              <div style={{ ...fpo, backgroundColor: '#000', opacity: '0.2' }} />
            </GridItem>
            <GridItem width={1/2}>
              <div style={{ ...fpo, backgroundColor: '#000', opacity: '0.2' }} />
            </GridItem>
            </Grid>
          </div>
        </GridItem>
      </Grid>
    </div>
  </GridItem>
</Grid>
```

