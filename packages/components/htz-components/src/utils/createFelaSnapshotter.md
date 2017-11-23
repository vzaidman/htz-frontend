<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Signature](#signature)
- [Params](#params)
- [Return](#return)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

A factory for creating util that captures snapshots of styled Fela components, 
and can be configured on a per-use-case basis.
 
### Signature
<code>(StyleProvider: Component, testRenderer: Function, theme?: Object) => Function</code>

### Params

| param | type | description | default value |
|-------|------|-------------|---------------|
| StyleProvider | Component | The Fela `StyleProvider` used in the target package |  |
| testRenderer | function | The Fela renderer used in the targes package's tests |  |
| theme | Object | The `theme` object used in the target package |  |

### Return
The configured `felaSnapshotter` 
A function that takes a React component and returns an object with a `component` 
key, containing the rendered html, and a `styles` key containing the generated CSS.
