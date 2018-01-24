<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents**

* [Signature](#signature)
* [Params](#params)
* [Return](#return)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

A factory for creating util that captures snapshots of styled Fela components,
and can be configured on a per-use-case basis.

### Signature

<code>(StyleProvider: Component, testRenderer: Function, theme?: Object) => Function</code>

### Params

| param         | type      | description                                          | default value |
| ------------- | --------- | ---------------------------------------------------- | ------------- |
| StyleProvider | Component | The Fela `StyleProvider` used in the target package  |               |
| testRenderer  | function  | The Fela renderer used in the targes package's tests |               |
| theme         | Object    | The `theme` object used in the target package        |               |

### Return

The configured `felaSnapshotter` function that creates a snapshot of a styled Fela component html as well as its styles
| param | type | description | default value |
| ------------- | --------- | ---------------------------------------------------- | ------------- |
| component | Component | The React Element to take a snapshot of | |
| options | Object | Aditional options | optional |
| options.createNodeMock | Function | A callback function is passed a dom element from a `ref` and should return a mock ref object. See: http://bit.ly/2BaUNQw and http://bit.ly/2AJ8fIT | optional |

**example:**

felaSnapshotter(<MyComponent />, {
createNodeMock: element =>
element.type === "div" ? { clientHeight: 1064 } : null
});
