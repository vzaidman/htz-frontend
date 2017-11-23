<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Examples](#examples)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### Examples

horizontal group
```jsx
<ButtonGroup 
  attrs={{ dir: 'rtl', }}
  miscStyles={{ display: 'inline-flex', }}
>
  <Button>First</Button>
  <Button>second</Button>
  <Button>Last</Button>
</ButtonGroup>
```

vertical group
```jsx
<ButtonGroup 
  attrs={{ dir: 'rtl', }}
  isColumn
  miscStyles={{ display: 'inline-flex', maxWidth: '20rem', }}>
  <Button>First</Button>
  <Button>second</Button>
  <Button>Last</Button>
</ButtonGroup>
```

Responsively set direction and order
```jsx
<ButtonGroup 
  attrs={{ dir: 'rtl', }}
  isColumn={{
    onServerRender: false,
    queries: [
    { until: 's', value: false, },
    { from: 's', until: 'l', value: true, },
    { from: 'l', until: 'xl', value: false, },
    { from: 'xl', value: true, },
    ],
  }} 
  miscStyles={{
    display: 'inline-flex', 
    maxWidth: [ 
      { until: 's', value: 'none', },
      { from: 's', until: 'l', value: '20rem', },
      { from: 'l', until: 'xl', value: 'none', },
      { from: 'xl', value: '20rem', },
    ],
  }}
>
  <Button 
    boxModel={[{until: 'xl', value: { groupPlacement: 'start', }, }, { from: 'xl', value:{ groupPlacement: 'end', }, }]}
    miscStyles={{ order: [ {  from: 'xl', value: '6'  }, ], }}
  >
    First?
  </Button>
  <Button 
    boxModel={[{until: 'xl', value: { groupPlacement: 'middle', }, }, { from: 'xl', value:{ groupPlacement: 'start', }, }]}
  >
    second
  </Button>
  <Button 
    boxModel={[{until: 'xl', value: { groupPlacement: 'end', }, }, { from: 'xl', value:{ groupPlacement: 'middle', }, }]}
  >
    Last
  </Button>
</ButtonGroup>
```
