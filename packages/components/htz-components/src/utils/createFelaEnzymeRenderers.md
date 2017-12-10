<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Signature](#signature)
- [Params](#params)
- [Return](#return)
- [Example](#example)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Factory for creating a util function that creates enzyme powered renderers
for styled Fela components, and can be configured on a per-use-case basis.
 
### Signature
<code>(renderer: Function, theme?: Object) => Function</code>

### Params

| param | type | description | default value |
|-------|------|-------------|---------------|
| renderer | function | The Fela renderer used in the targes package's tests |  |
| theme | Object | The `theme` object used in the target package |  |

### Return
An object with `felaMount` and `felaShallow` methods for mounting and shallow rendering Fela components with the `renderer` and `theme` in context.

<!--
SNAPSHOT TESTING OF ENZYME COMPONENTS IS DISABLED UNTIL WE FIGURE OUT HOW 
NOT TO BREAK THE BUILD WITH "enzyme-to-json", WHICH IS WRITTEN IN ES6 AND DOES NOT GET TRANSPILED
-->
<!--
components returned by each of the methods will be augmented by a `snapshot` static method, which converts them to an object with `component` and `style` keys, useful for snapshot testing.

### Example
```js static
const { felaMount, felaShallow, } = createFelaEnzymeRenderers(felaRenderer, theme);

console.log(felaMount(<Button>hello</Button>).snapshot())
// Object {
//   "component": <ButtonRules>
//     <div
//         className="a b c"
//     >
//         hello
//     </div>
// </ButtonRules>,
//   "styles": ".a{width:10px}.b{height:10px}.c{background-color:red}",
// }
```
-->
