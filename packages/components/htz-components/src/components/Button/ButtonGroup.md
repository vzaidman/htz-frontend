<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents**

- [**Group Order**](#group-order)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

It can sometimes be useful to group buttons together functionally and visually.

By default, the `ButtonGroup` component groups buttons horizontally next
to one another.

```jsx
<ButtonGroup attrs={{ dir: 'rtl' }} miscStyles={{ display: 'inline-flex' }}>
  <Button>First</Button>
  <Button>second</Button>
  <Button>Last</Button>
</ButtonGroup>
```

Passing the `isColumn` prop vertically stacks the buttons on top of each other

```jsx
<ButtonGroup
  attrs={{ dir: 'rtl' }}
  isColumn
  miscStyles={{ display: 'inline-flex', maxWidth: '20rem' }}>
  <Button>First</Button>
  <Button>second</Button>
  <Button>Last</Button>
</ButtonGroup>
```

A different stacking direction can be set for different breakpoints by passing
an object with the following keys to `isColumn` prop:

- `queries` (`array`)
  An array of responsive options, whose items are object denoting `from`,
  `until`, and `misc` breakpoints, and a boolean value in the given breakpoint.
- `onServerRender`: (`boolean`)
  Sets the default formation on the server.

```jsx static
<ButtonGroup
  isColumn={{
    onServerRender: false,
    queries: [
      { until: 's', value: false },
      { from: 's', until: 'l', value: true },
      { from: 'l', until: 'xl', value: false },
      { from: 'xl', value: true },
    ],
  }}>
  {/* ... */}
</ButtonGroup>
```

Resize the screen to change the group's stacking:

```jsx
<ButtonGroup
  attrs={{ dir: 'rtl' }}
  isColumn={{
    onServerRender: false,
    queries: [
      { until: 's', value: false },
      { from: 's', until: 'l', value: true },
      { from: 'l', until: 'xl', value: false },
      { from: 'xl', value: true },
    ],
  }}
  miscStyles={{
    display: 'inline-flex',
  }}>
  <Button>button 1</Button>
  <Button>button 2</Button>
  <Button>button 3</Button>
</ButtonGroup>
```

### **Group Order**

When placed inside a `ButtonGroup`, a button can specify its placement inside
the group by specifying a `groupPlacement` key in the `boxModel` prop to either
`start`, `middle` or `end`. This can be useful when needing to reorder buttons
differently in different breakpoints.

Resize the screen to reorder the buttons:

```jsx
<ButtonGroup
  attrs={{ dir: 'rtl' }}
  miscStyles={{
    display: 'inline-flex',
  }}>
  <Button
    boxModel={[
      { until: 'l', value: { groupPlacement: 'start' } },
      { from: 'l', value: { groupPlacement: 'end' } },
    ]}
    miscStyles={{ order: [{ from: 'l', value: '6' }] }}>
    Button 1
  </Button>
  <Button
    boxModel={[
      { until: 'l', value: { groupPlacement: 'middle' } },
      { from: 'l', value: { groupPlacement: 'start' } },
    ]}>
    Button 2
  </Button>
  <Button
    boxModel={[
      { until: 'l', value: { groupPlacement: 'end' } },
      { from: 'l', value: { groupPlacement: 'middle' } },
    ]}>
    Button 3
  </Button>
</ButtonGroup>
```
