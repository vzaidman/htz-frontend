<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Return](#return)
- [Example](#example)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

 A helper function for testing if the `window` object is 
 available has the `matchMedia` method

 ### Return
 A `boolean` indicating if the `window` object exists and if the `matchMedia` 
 method is available on it.

### Example
```js static
console.log(hasMatchMedia());
// Logs:
//   On the server: false
//   In legacy browsers: false
//   In modern browsers: true
```
