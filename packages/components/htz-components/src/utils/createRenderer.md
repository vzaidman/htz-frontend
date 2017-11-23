<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Signature](#signature)
- [Params](#params)
- [Return](#return)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Create a custom Fela renderer, tailored to an app's needs
 
### Signature
<code>(options?: Object) => Function</code>

### Params

| param | type | description | default value |
|-------|------|-------------|---------------|
| options| Object | A options object (optional) | process.env.NODE_ENV !== 'production' |
| options.isDev | boolean | Manually override the node environment settings. Can be useful, e.g., for testing. | |
| options.isRtl | boolean | Set the renderer to handle RTL layouts | | 
| options.selectorPrefix | boolean | A string to namespace all class names with | 'htz-' |

### Return
A fela `createRenderer` function
