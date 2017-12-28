<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Link examples](#link-examples)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### Link examples

A simple link.
```jsx
<Link
  href='https://www.haaretz.co.il'
  content='Haaretz'
/>
```

A simple link which opens in another tab.
```jsx
<Link
  href='https://themarker.com'
  content='The Marker'
  target='_blank'
/>
```

A link contains another component.
```jsx
<Link
  href='http://www.iflscience.com/physics/new-type-of-bizarre-quantum-material-discovered/'
  content={
    <Paragraph
      setNextComponentMarginTop={shouldMargin => console.log(shouldMargin)} 
      content={
        {
          "attributes": [],
          "tag": "p",
          "content": [
            {
              "attributes": [
                {
                  "key": "text",
                  "value": "New Type Of Bizarre Quantum Material Discovered."
                }
              ],
              "tag": "#text"
            }
          ]
        }
      }
    />
  }
  target='_blank'
/>
```
