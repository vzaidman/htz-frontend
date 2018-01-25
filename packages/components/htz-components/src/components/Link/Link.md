<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Link examples](#link-examples)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### Link examples

The Link component wraps [Next JS's Link component](https://github.com/zeit/next.js/#with-link), 
and can be used to transition between an application's routes (pages) in the front-end.
```jsx
<Link
  href='https://www.haaretz.co.il'
  content='Haaretz'
/>
```

A link's target can be changed using the `target` prop, which act just like the `target` 
attribute on regular `<a />` DOM elements.
```jsx
<Link
  href='https://themarker.com'
  content='The Marker'
  target='_blank'
/>
```

Link can be nested inside, and/or host another component.<br/>
(here's a Link within [`<Paragraph />`](./#paragraph) recursive component)
```jsx
<Paragraph
  {...
    {
      "attributes": [
        {
          "key": "href",
          "value":"http://www.iflscience.com/physics/new-type-of-bizarre-quantum-material-discovered/"
        },
        {
          "key": "target",
          "value":"_blank"
        }
      ],
      "tag": "a",
      "content": [
        {
          "attributes": [],
          "tag": "span",
          "content": [
            {
              "attributes": [
                {
                  "key": "text",
                  "value": "New Type Of "
                }
              ],
              "tag": "#text"
            },
            {
              "attributes": [],
              "tag": "strong",
              "content": [
                {
                  "attributes": [
                    {
                      "key": "text",
                      "value": "Bizarre Quantum Material"
                    }
                  ],
                  "tag": "#text"
                },
              ]
            },
            {
              "attributes": [
                {
                  "key": "text",
                  "value": " Discovered."
                }
              ],
              "tag": "#text"
            }
          ]
        }
      ]
    }
  }    
/>
```
