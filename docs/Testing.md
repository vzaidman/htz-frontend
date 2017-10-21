<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Testing](#testing)
  - [Snapshot-testing Fela components](#snapshot-testing-fela-components)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Testing

Test are run using the [Jest](https://facebook.github.io/jest/docs/en/getting-started.html) javascript
test runner.

Test files should live in a `__tests__` subdirectory of the code they thest, and have identical names
to the files they run tests for, except for having a `.test.js` extension instead of `.js`.

## Snapshot-testing Fela components

The `@haaretz/htz-components` export a 
[`createFelaSnapshotter`](../packages/components/htz-components/src/components/createFelaSnapshotter/createFelaSnapshotter.js#L7)
function, which, as indicated by its name, returns a `felaSnapshotter` function, 
configured to create snapshots (See 
[Snapshot Testing with Jest](https://facebook.github.io/jest/docs/en/snapshot-testing.html)) 
both the HTML and style output of style Fela components.

Only a single instance of a `felaSnapshotter` function should exist in each package and it can be used
in the following manner:

```js
it('renders correctly', () => {
  expect(felaSnapshotter(<Component />))
    .toMatchSnapshot();
});

```
