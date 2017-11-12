<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [A basic input label component](#a-basic-input-label-component)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### A basic input label component

Can be used to create an input label, that is connected to an input with htmlFor, or by having a child input component

A basic input label
```jsx 
<InputLabel 
 text="This a label"
 />
```

Label with a style properties ,labelFor, and text props
```jsx 
     <InputLabel
        labelFor="aa"
        text="this is a test text passed through a prop"
        styleObject= {
          {
            fontSize: '4rem',
            color: 'blue',
            backgroundColor: 'red',
          }
        }
      />;
```






