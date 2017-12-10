<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Signature](#signature)
- [Params](#params)
- [Return](#return)
- [Example](#example)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

A utility that iterates over an array of object describing 
media-queries and returns the value of the first query that 
matches the current window size.

### Signature
<code>(
  bps: { widths: Object, misc: Object, }, 
  options: { queries: Object[], }
) => Any </code>

### Params
| param | type | description | default value |
|-------|------|-------------|---------------|
| bps | object | An object of named breakpoints to match the queries against | |
| bps.widths | object | An object of named width-breakpoint and their boundary value | |
| bps.misc | object | An object of named miscellaneous media-queries | |
| options | object | | |
| options.queries | query[] | An array of objects describing a media query and the value to return when the query matches | optional |
| options.queries[].from | number | A named width breakpoint used as the min-width boundary point | optional |
| options.queries[].until | number | A named width breakpoint used as the max-width boundary point | optional |
| options.queries[].misc | string | A named misc breakpoint | optional |
| options.queries[].type | string | A media type (e.g., `screen`, `print`, etc.) | optional |
| options.queries[].value | string | The value to use if the query matches. | optional |


### Return

The value associated with the first query that matches the current window size

### Example

```js static
window.addEventListener('resize', (evt) => console.log(
  mediaMatchesQuery(
    {
      widths: { s: 640, m: 800, l: 960, },
      misc: { landscape: '(orientation: landscape)', },
    },
    {queries: [
      { until: 's', value: 'BOM!', },
      { until: 'm', value: 'BAM!', },
      { until: 'l', value: 'BIM!', },
    ],}
  )
));

// Logs:
//   window.innerWidth <= 639: 'BOM'
//   window.innerWidth <= 799: 'BAM'
//   window.innerWidth <= 959: 'BOM'
```
