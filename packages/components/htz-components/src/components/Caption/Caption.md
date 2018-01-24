<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Examples](#examples)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### Examples

```jsx
<Grid rowSpacing={{ amount: 2, nUp: 3, }}>
  
  <GridItem width={1/3}>
    <p>With the default props</p> 
    <Caption
      caption='סתם תיאור של משהו'
      credit='מישהו'
    />
  </GridItem>
  
  <GridItem width={1/3}>
    <p>Left to right, and dynamic background</p> 
    <Caption
      caption='Caption content'
      credit='Some guy'
      creditprefix='Credit'
      direction='ltr'
      backgroundColor={[{until: 'xl', value: ['tertiary', '-3'],}, { from: 'xl', value: 'primary',}, ]}
    />
  </GridItem>
  
  <GridItem width={1/3}>
    <p>With the credit having its own direction</p> 
    <Caption
      caption='סתם תיאור של משהו'
      credit='Some guy'
      creditprefix='Credit'
      backgroundColor={['neutral', '-10']}
      color={'neutral'}
    />
  </GridItem>
</Grid>
```
